'use server';

import axios from 'axios';
import { currentUser } from '@clerk/nextjs/server'; 
// Or `@clerk/nextjs` depending on your setup

type Website = {
    id: string;
    userId: string;
    url: string;
    ticks: {
      id: string;
      websiteId: string;
      validatorId: string;
      createdAt: Date;
      status: 'UP' | 'DOWN'; // Adjust to your enum
      latency: number;
    }[];
  };
export async function fetchWebsiteStatus(id: string) {
  const user =  await currentUser();

  if (!user?.id) {
    throw new Error('Not authenticated');
  }

  try {
    const res = await axios.post<{ website: Website }>(
      'http://localhost:8000/api/v1/website/status',
      { id },
      {
        headers: { clerkId: user.id },
      }
    );

    return res.data.website;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
