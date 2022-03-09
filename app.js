import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan"
import indexRouter from "./src/server/route/index.route.js"



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/api', indexRouter);


export default app;
