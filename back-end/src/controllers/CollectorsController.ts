import knex from '../database/conection';
import { Request, Response } from 'express';

class CollectorsController {
  async index(req: Request, res: Response) {

    const collector = await knex('collectors');

    const serializedCollector = collector.map(col => {
      return {
        ...col,
      }
    });
    return res.json(serializedCollector);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const collector = await knex('collectors').where('id', id).first();

    if (!collector) {
      return res.status(400).json({ message: "Coletor não encontrado" });
    }

    const serializedCollector = {
      ...collector,
    };
    return res.json({ collector: serializedCollector });
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      cpf
    } = req.body;

    const trx = await knex.transaction();

    const collector = {
      name,
      email,
      password,
      cpf
    }

    const insertedIds = await trx('collectors').insert(collector);
    const collector_id = insertedIds[0]

    await trx.commit();

    return res.json({
      id: collector_id,
      ...collector
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const collector = await knex('collectors')
      .where("id", id)
      .select('collectors.id')
      .first()

    if (collector.id !== id) {
      return res.status(401).json({ error: " Operation not permited" })
    }
    await knex('collectors').where('id', id).delete();
    return res.status(204).send()
  }

}

export default CollectorsController;
