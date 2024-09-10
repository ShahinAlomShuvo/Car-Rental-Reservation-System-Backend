import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler.middleware";
import notFound from "./middleware/notFound.middleware";
import router from "./router/router";
const app: Application = express();

app.use(express.json());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Car Rental Reservation System");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
