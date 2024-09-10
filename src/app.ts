import express, { Application, Request, Response } from "express";
import { authRoute } from "./modules/auth/auth.route";
const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRoute.router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Car Rental Reservation System");
});

export default app;
