import knex from '../database/conection';
import { Request, Response } from 'express';

class UsersController {
  async index(req: Request, res: Response) {

    const users = await knex('users');

    const serializedUsers = users.map(point => {
      return {
        ...point,
      }
    });
    return res.json(serializedUsers);
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await knex('users').where('id', id).first();

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const serializedUser = {
      ...user,
    };
    return res.json({ user: serializedUser });
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      likes
    } = req.body;

    const trx = await knex.transaction();

    const user = {
      name,
      email,
      password,
      likes
    }

    const insertedIds = await trx('users').insert(user);
    const user_id = insertedIds[0]

    await trx.commit();

    return res.json({
      id: user_id,
      ...user
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const user = await knex('users')
      .where("id", id)
      .select('users.id')
      .first()

    if (user.id !== id) {
      return res.status(401).json({ error: " Operation not permited" })
    }
    await knex('users').where('id', id).delete();
    return res.status(204).send()
  }
}

export default UsersController;
