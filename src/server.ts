import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { Server } from "http";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.db_uri as string);
    server = app.listen(config.port, () => {
      console.log(
        `Car Rental Reservation System listening on port ${config.port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log(" UNHANDLED REJECTION IS DETECTED, SHUTTING DOWN...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(" UNCAUGHT EXCEPTION IS DETECTED, SHUTTING DOWN...");
  process.exit(1);
});
