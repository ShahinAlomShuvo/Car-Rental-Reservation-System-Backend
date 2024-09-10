import express, { Application, Request, Response } from "express";
import { authRoute } from "./modules/auth/auth.route";
import globalErrorHandler from "./middleware/globalErrorHandler.middleware";
import notFound from "./middleware/notFound.middleware";
const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRoute.router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Car Rental Reservation System");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
