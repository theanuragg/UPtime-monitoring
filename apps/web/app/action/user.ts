'use server'

import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export async function cxyz(url: string) {
  try {
    const user = await currentUser();
    if (!user?.id) throw new Error("User not authenticated");

    await axios.post(
      `http://localhost:8000/api/v1/website`,
      { url },
      {
        headers: { clerkId: user.id },
      }
    );

    console.log("API call successful");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error making API call:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

