import { randomUUIDv7, type ServerWebSocket } from "bun";
import type { IncomingMessage, SignupIncomingMessage } from "common/types";
import { prisma } from "db/client";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";
import { sendFailureMail } from "./email";

const availableValidators: {
  validatorId: string;
  socket: ServerWebSocket<unknown>;
  publicKey: string;
}[] = [];

const CALLBACKS: { [callbackId: string]: (data: IncomingMessage) => void } = {};
const COST_PER_VALIDATION = 100;

Bun.serve({
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  port: 8081,
  websocket: {
    async message(ws: ServerWebSocket<unknown>, message: string) {
      const data: IncomingMessage = JSON.parse(message);

      if (data.type === "signup") {
        const verified = await verifyMessage(
          `Signed message for ${data.data.callbackId}, ${data.data.publicKey}`,
          data.data.publicKey,
          data.data.signedMessage
        );
        if (verified) {
          await signupHandler(ws, data.data);
        }
      } else if (data.type === "validate") {
        CALLBACKS[data.data.callbackId](data);
        delete CALLBACKS[data.data.callbackId];
      }
    },
    async close(ws: ServerWebSocket<unknown>) {
      availableValidators.splice(
        availableValidators.findIndex((v) => v.socket === ws),
        1
      );
    },
  },
});

async function signupHandler(
  ws: ServerWebSocket<unknown>,
  { ip, publicKey, signedMessage, callbackId }: SignupIncomingMessage
) {
  const validatorDb = await prisma.validator.findFirst({
    where: {
      publickey: publicKey,
    },
  });

  if (validatorDb) {
    ws.send(
      JSON.stringify({
        type: "signup",
        data: {
          validatorId: validatorDb.id,
          callbackId,
        },
      })
    );

    availableValidators.push({
      validatorId: validatorDb.id,
      socket: ws,
      publicKey: validatorDb.publickey,
    });
    return;
  }

  const validator = await prisma.validator.create({
    data: {
      ip,
      publickey: publicKey,
      location: "unknown",
    },
  });

  ws.send(
    JSON.stringify({
      type: "signup",
      data: {
        validatorId: validator.id,
        callbackId,
      },
    })
  );

  availableValidators.push({
    validatorId: validator.id,
    socket: ws,
    publicKey: validator.publickey,
  });
}

async function verifyMessage(
  message: string,
  publicKey: string,
  signature: string
) {
  const messageBytes = nacl_util.decodeUTF8(message);
  const result = nacl.sign.detached.verify(
    messageBytes,
    new Uint8Array(JSON.parse(signature)),
    new PublicKey(publicKey).toBytes()
  );

  return result;
}

setInterval(async () => {
  const websitesToMonitor = await prisma.website.findMany({
    where: {
      disabled: false,
    },
  });

  for (const website of websitesToMonitor) {
    availableValidators.forEach((validator) => {
      const callbackId = randomUUIDv7();
      console.log(
        `Sending validate to ${validator.validatorId} ${website.url}`
      );
      validator.socket.send(
        JSON.stringify({
          type: "validate",
          data: {
            url: website.url,
            callbackId,
          },
        })
      );

      CALLBACKS[callbackId] = async (data: IncomingMessage) => {
        if (data.type === "validate") {
          const { validatorId, status, latency, signedMessage } = data.data;
          const verified = await verifyMessage(
            `Replying to ${callbackId}`,
            validator.publicKey,
            signedMessage
          );
          if (!verified) {
            return;
          }

          await prisma
            .$transaction(
              async (tx) => {
                await tx.website_tick.create({
                  data: {
                    websiteId: website.id,
                    validatorId,
                    status: status.toLowerCase() as "good" | "bad",
                    latency,
                    createdAt: new Date(),
                  },
                });

                await tx.validator.update({
                  where: { id: validatorId },
                  data: {
                    pendingPayout: { increment: COST_PER_VALIDATION },
                    lastEmailSentAt: new Date(),
                  },
                });

                if (status.toLowerCase() === "bad") {
                  const user = await tx.user.findUnique({
                    where: { id: website.userId },
                    select: { email: true },
                  });

                  const validatorObj = await tx.validator.findUnique({
                    where: { id: validatorId },
                    select: { location: true, lastEmailSentAt: true },
                  });

                  const now = new Date();

                  const shouldSendEmail =
                    !validatorObj?.lastEmailSentAt ||
                    now.getTime() -
                      new Date(validatorObj.lastEmailSentAt).getTime() >
                      60 * 60 * 1000;

                  if (
                    user?.email &&
                    validatorObj?.location &&
                    shouldSendEmail
                  ) {
                    await sendFailureMail(
                      user.email,
                      website.url,
                      validatorObj.location
                    );

                    await tx.validator.update({
                      where: { id: validatorId },
                      data: {
                        lastEmailSentAt: now,
                      },
                    });
                  }
                }
              },
              {
                timeout: 10000,
              }
            )
            .catch((err) => {
              console.error("Transaction failed:", err);
            });
        }
      };
    });
  }
}, 60 * 1000);
