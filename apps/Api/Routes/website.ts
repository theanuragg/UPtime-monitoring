import express from "express"
import { websiteStatus, websitecreate, websitesStatus, websiteupadte} from "../Controller/Website.controller"

export const websiteRouter = express.Router()

websiteRouter.post("/v1/website", websitecreate)
websiteRouter.get("/v1/website/status", websiteStatus)
websiteRouter.get("/v1/websites", websitesStatus)
websiteRouter.delete("/v1/website", websiteupadte)
