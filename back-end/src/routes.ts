import express from 'express';
import multerConfig from './config/multer';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsControllers from './controllers/ItemsController';
import UsersController from './controllers/UsersController';
import CollectorsController from './controllers/CollectorsController';


const routes = express.Router()
const upload = multer(multerConfig);


const collectorsController = new CollectorsController();
const pointController = new PointsController();
const itemsController = new ItemsControllers();
const userController = new UsersController();

/**
 * Rotas de items
 */
routes.get('/items', itemsController.index);
/**
 * Rotas de pontos
 */
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

/**
 * Rotas de usuarios
 */
routes.get('/users/:id', userController.show);
routes.get('/users', userController.index);
routes.delete('/users/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), userController.delete);

routes.post(
  '/users',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      likes: Joi.number().required(),
    }),

  }, {
    abortEarly: false
  }),
  userController.create);

/**
 * Rota de coletores
 */

routes.get('/collectors', collectorsController.index);
routes.get('/collectors/:id', collectorsController.show);
routes.post(
  '/collectors',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      cpf: Joi.string().required(),
    }),

  }, {
    abortEarly: false
  }),
  collectorsController.create);

routes.delete('/collectors/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), collectorsController.delete);

export default routes;
