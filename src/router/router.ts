import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { carRoute } from "../modules/car/car.route";

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
