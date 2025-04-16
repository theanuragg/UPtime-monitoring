'use server'

import axios from "axios";
import { currentUser } from "@clerk/nextjs/server"; // adjust this import if needed

export async function fetchUserWebsites() {
  try {
    const user = await currentUser();
    if (!user?.id) throw new Error("User not authenticated");

    const response = await axios.get(`http://localhost:8000/api/v1/websites`, {
      headers: {
        clerkId: user.id,
      },
    });

    console.log("API response:", response.data);
    return response.data; // optionally return data
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching websites:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}
