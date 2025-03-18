import express from "express";
import type { NextFunction, Request, Response } from "express";
import { prisma } from "db/client";
import { PrismaClient } from "@prisma/client/extension";
import { log } from "console";

export const websitecreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const userId = req.userId!;
  const { url } = req.body;

  try {
    const data = await prisma.website.create({
      data: {
        userId,
        url,
      },
    });
    res.status(201).json({ id: data.id });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const websiteStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const websiteId = req.query.websiteId! as unknown as string;
  const userId = req.userId;

  try {
    const data = await prisma.website.findFirst({
      where: {
        id: websiteId,
        userId,
        disabled: false,
      },
      include: {
        ticks: true,
      },
    });
    if (!data) {
       res.status(404).json({ error: 'Website not found' });
    }
    
    res.status(200).json(data);
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const websitesStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId!;
  try {
    const websites = await prisma.website.findMany({
      where: {
        userId,
        disabled: false,
      },
      include: {
        ticks: true,
      },
    });
    res.status(200).json(websites);
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const websiteupadte = async (req: Request, res: Response, next: NextFunction) => {
  const websiteId = req.body.webisteId;
  const userId = req.userId!;

  try {
    const updatedWebsite = await prisma.website.update({
      where: {
        id: websiteId,
        userId,
      },
      data: {
        disabled: true,
      },
    });

    res.status(200).json({ message: "Website disabled successfully" });
  } catch (error) {
    
    res.status(404).json({ error: 'Website not found' });
  }
};

export const payoutwithvalidator = (req: Request, res: Response, next: NextFunction) => {
  const { amount, userId } = req.body;
//   if (!amount || !userId) {
//     return res.status(400).json({ error: 'Amount and User ID are required.' });
//   }

//   try {
//     payoutService.processPayout(userId, amount);
//   } catch (error) {
//     return next(error);
//   }

  res.status(200).json({ message: 'Payout processed successfully.' });
};