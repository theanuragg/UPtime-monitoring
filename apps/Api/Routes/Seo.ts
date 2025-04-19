import { Router } from 'express';
import { crawlWebsite, getReports } from '../Controller/Seo.controller';


const SeoRouter = Router();

SeoRouter.post('/v1/crawl', crawlWebsite);
SeoRouter.get('/v1/reports', getReports);

export default SeoRouter;
