import "reflect-metadata";
import "./shared/container"
import express from "express";
import { AppDataSource } from "./dataSource";
import { routes } from "./routes";
import errorMiddleware from "./middlewares/errorMiddleware";

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());
    app.use(routes);
    app.use(errorMiddleware);


    return app.listen(process.env.PORT)
});