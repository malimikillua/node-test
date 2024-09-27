import express from "express";
import { Request, Response } from "express";
import helmet from "helmet";
import noCache from "nocache";
import cors from "cors";
import * as dotenv from "dotenv";

import { errorHandler, notFoundHandler } from "./middleware/error.middleware";

declare module "express" {}

dotenv.config();

const app = express();

app.use(cors());
app.use(noCache());
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req: Request, res: Response) => {
  res.end("Works!!");
});

// Error handling for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  gracefulShutdown();
});

// Error handling for unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown();
});

// Graceful shutdown function
function gracefulShutdown() {
  console.log("Shutting down gracefully...");
  process.exit(1);
}

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
