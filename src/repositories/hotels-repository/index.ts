import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

const hotelsRepository = {
  findHotels
};

export default hotelsRepository;
