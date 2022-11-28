import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findHotelRoomsById(hotelId: number) {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId
    },
    include: {
      Rooms: true
    }
  });    
}

const hotelsRepository = {
  findHotels,
  findHotelRoomsById
};

export default hotelsRepository;
