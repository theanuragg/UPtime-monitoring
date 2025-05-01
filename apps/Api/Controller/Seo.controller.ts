import type { Request, Response } from "express";
import axios from 'axios';
import * as cheerio from 'cheerio';
import { prisma } from "db/client";
import { getTextFile } from '../utils/filetet';

export const crawlWebsite = async (req: Request, res: Response) => {
  const { url } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }

  if (!url) {
    return res.status(400).json({ message: "URL is required", success: false });
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content') || null;

    const h1s: string[] = [];
    $('h1').each((_, el) => {
      h1s.push($(el).text());
    });

    const links: string[] = [];
    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href?.startsWith('http')) links.push(href);
    });

    const brokenLinks: string[] = [];
    for (const link of links) {
      try {
        const r = await axios.get(link);
        if (r.status >= 400) brokenLinks.push(link);
      } catch {
        brokenLinks.push(link);
      }
    }

    const imagesWithoutAlt: string[] = [];
    $('img').each((_, el) => {
      const alt = $(el).attr('alt');
      if (!alt) imagesWithoutAlt.push($(el).attr('src') || '');
    });

    const robotsTxt = await getTextFile(url, 'robots.txt');
    const sitemapXml = await getTextFile(url, 'sitemap.xml');

    const result = await prisma.sEOReport.create({
      data: {
        url, 
        title,
        description,
        h1s,
        robotsTxt,
        sitemapXml,
        brokenLinks,
        imagesWithoutAlt
      }
    });

    res.status(201).json({
      message: "SEO report created",
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong', success: false });
  }
};

export const getReports = async (_: Request, res: Response) => {
  const reports = await prisma.sEOReport.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.json(reports);
};
