import { conflictError, notFoundError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import ticketService from "../tickets-service";

async function hasHotelTicket(userId: number) {
  const ticket = await ticketService.getTicketByUserId(userId);
  if(!ticket) {
    throw notFoundError();
  }
  if(ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status !== "PAID") {
    throw conflictError("invalid ticket");
  }
  return true;
}

async function listHotelsAfterPayment(userId: number) {
  if(!await hasHotelTicket(userId)) return;

  const hotels = await hotelsRepository.findHotels();
  return hotels;
}

async function listHotelWithRooms(userId: number, hotelId: number) {
  if(!await hasHotelTicket(userId)) return;

  const hotel = await hotelsRepository.findHotelRoomsById(hotelId); 
  return hotel;
}

const hotelsService = {
  listHotelsAfterPayment,
  listHotelWithRooms
};

export default hotelsService;
