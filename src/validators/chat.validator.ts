import Joi from 'joi';
import { IChat } from '../models';

export const validateChatParam = (params: IChat) => {
  return Joi.object({
    message: Joi.string().trim().required(),
  }).validate(params);
};
