import type { Request, Response, NextFunction } from "express";
import { prisma } from "db/client";

const handleUnauthorizedAccess = (res: Response) => {
  res.status(401).json({
    message: "Unauthorized access",
    success: false,
  });
};
export const createWebsite = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    console.log("Request body:", req.body); 
    if (!userId) {
      handleUnauthorizedAccess(res);
      return;
    }
    const { url } = req.body;
    if (!url) {
      res.status(400).json({
        message: "Url is required",
        success: false,
      });
      console.log("erorr")
      return;
    }
    const website = await prisma.website.create({
      data: {
        url,
        userId,
      },
    });
    res.status(201).json({
      message: "Website created successfully",
      success: true,
      data: website,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
export const getWebsiteStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!req.userId) {
      handleUnauthorizedAccess(res);
      return;
    }
    const website = await prisma.website.findFirst({
      where: {
        id,
        userId: req.userId,
        disabled: false,
      },
      include: {
        ticks: true,
      },
    });
    if (!website) {
      res.status(404).json({
        message: "Website not found",
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: "Website found",
      success: true,
      website: website,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
export const getWebsites = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      handleUnauthorizedAccess(res);
      return;
    }
    const websites = await prisma.website.findMany({
      where: {
        userId,
        disabled: false,
      },
    });
    res.status(200).json({
      message: "Websites found",
      success: true,
      websites,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
export const deleteWebsite = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    if (!userId) {
      handleUnauthorizedAccess(res);
      return;
    }
    const website = await prisma.website.delete({
      where: {
        id,
        userId,
      },
    });
    if (!website) {
      res.status(404).json({
        message: "Website not found",
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: "Website deleted successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};