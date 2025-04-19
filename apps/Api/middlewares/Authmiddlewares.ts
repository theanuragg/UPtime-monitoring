import type { Request, Response, NextFunction } from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { prisma } from "db/client";
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clerkId = req.headers.clerkid as string | undefined;
  if (!clerkId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  let email = "";
  try {
    const clerkUser = await clerkClient.users.getUser(clerkId);
    email = clerkUser.emailAddresses[0]?.emailAddress || "";
  } catch (err) {
    console.error("Error fetching user from Clerk:", err);
    res.status(401).json({ error: "Failed to verify Clerk user" });
    return;
  }

  if (!email) {
    res.status(401).json({ error: "No email found for user" });
    return;
  }

  let user = await prisma.user.findUnique({
    where: {
      clerk: clerkId,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerk: clerkId,
        email,
      },
    });
  }
  req.userId = user.id;
  next();
}
