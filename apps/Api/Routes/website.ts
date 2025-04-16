import express from "express"
import  { createWebsite, getWebsiteStatus, getWebsites, deleteWebsite,} from "../Controller/Website.controller"

export const websiteRouter = express.Router()

websiteRouter.post("/v1/website", createWebsite)
websiteRouter.post("/v1/website/status", getWebsiteStatus)
websiteRouter.get("/v1/websites", getWebsites)
websiteRouter.delete("/v1/website", deleteWebsite)
