import { notFoundError, unauthorizedError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import ticketService from "../tickets-service";

async function listHotelsAfterPayment(userId: number) {
  const ticket = await ticketService.getTicketByUserId(userId);
  if(!ticket) {
    throw notFoundError();
  }
  if(!ticket.TicketType.isRemote && ticket.TicketType.includesHotel) {
    throw unauthorizedError();
  }

  const hotels = await hotelsRepository.findHotels();
  return hotels;
}

const hotelsService = {
  listHotelsAfterPayment
};

export default hotelsService;
