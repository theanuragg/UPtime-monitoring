import express from 'express'
import type { Request, Response, NextFunction } from "express";
import { prisma } from "db/client";
import { z } from "zod";

const handleError = (res: Response, error: any) => {
    console.error(error); 
    res.status(500).json({ error: 'Internal Server Error' }); 
};

const querySchema = z.object({
    websiteId: z.string().nonempty("Website ID is required"),
});


export const websitecreate = async (req: Request, res: Response, next: NextFunction) => {
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
        handleError(res, error);
    }
};

export const websiteStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedQuery = querySchema.parse(req.query); 
        const websiteId = validatedQuery.websiteId;
        const userId = req.userId;

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
        if (error instanceof z.ZodError) {
             res.status(400).json({ error: error.errors }); 
        }
        handleError(res, error);
    }
};

export const websitesStatus = async (req: Request, res: Response, next: NextFunction) => {
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
        handleError(res, error);
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
    } catch (error: any) {
        if (error.code === 'P2025') { 
             res.status(404).json({ error: 'Website not found' }); 
        }
        handleError(res, error);
    }
};


export const payoutwithvalidator = async (req: Request, res: Response, next: NextFunction) => {
    
};