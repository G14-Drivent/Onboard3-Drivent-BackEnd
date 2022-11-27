import Joi from "joi";

export const hotelsParamsSchema = Joi.object<{hotelId: number}>({
  hotelId: Joi.number().min(1).required()
});
