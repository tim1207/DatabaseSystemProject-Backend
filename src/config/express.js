import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan"
import indexRouter from "../server/route/index.route.js"
import middlewareService from "../server/helper/middleware.js";
import cors from "cors"
import imgRouter from "../server/route/img.router.js"
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(path.resolve(), 'public')));
app.use('/img', imgRouter);
app.use('/api', indexRouter);
app.use(middlewareService.outputError);

export default app;
