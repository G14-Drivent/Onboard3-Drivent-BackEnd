import { Router } from "express";
import { authenticateToken, validateParams } from "@/middlewares";
import { hotelsParamsSchema } from "@/schemas";
import { getHotelRooms, getHotels } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("", getHotels)
  .get("/:hotelId", validateParams(hotelsParamsSchema), getHotelRooms)
;

export { hotelsRouter };
