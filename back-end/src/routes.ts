import express from 'express';
import multerConfig from './config/multer';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsControllers from './controllers/ItemsController';

const routes = express.Router()
const upload = multer(multerConfig);

const pointController = new PointsController();
const itemsController = new ItemsControllers();

routes.get('/items', itemsController.index);
routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);
routes.delete('/points/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), pointController.delete);

routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required()
    }),
  },
    {
      abortEarly: false
    }
  ),
  pointController.create);

  routes.post(
    '/points/:id/likes',
    pointController.likes);

export default routes;
