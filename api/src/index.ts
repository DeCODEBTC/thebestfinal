import "express-async-errors";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { authenticateRoutes } from "./routes/authenticate.routes";
import { peopleRoutes } from "./routes/peoples.routes";
import { AppErrors } from "./errors/AppErrors";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(authenticateRoutes);
  app.use(peopleRoutes);

  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppErrors) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }

      return response.status(500).json({
        status: "error",
        message: `Internal server error ${err.message}`,
      });
    }
  );

  return app.listen(9000, () => console.log("server is running"));
});
