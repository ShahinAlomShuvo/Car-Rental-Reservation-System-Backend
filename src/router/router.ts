import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { carRoute } from "../modules/car/car.route";
import { bookingRoute } from "../modules/booking/booking.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/cars",
    route: carRoute,
  },

  {
    path: "/bookings",
    route: bookingRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
