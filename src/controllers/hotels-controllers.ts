import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotels = await hotelsService.listHotelsAfterPayment(userId);

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotelId  = Number(req.params.hotelId);

  try {
    const hotel = await hotelsService.listHotelWithRooms(userId, hotelId);

    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === "ConflictError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
