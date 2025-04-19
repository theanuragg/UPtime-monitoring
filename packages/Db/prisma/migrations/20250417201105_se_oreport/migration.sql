-- CreateTable
CREATE TABLE "SEOReport" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "h1s" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "robotsTxt" TEXT,
    "sitemapXml" TEXT,
    "brokenLinks" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "imagesWithoutAlt" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SEOReport_pkey" PRIMARY KEY ("id")
);
