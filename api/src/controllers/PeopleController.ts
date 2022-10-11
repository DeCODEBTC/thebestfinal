import { Request, Response } from "express";
import { AppErrors } from "../errors/AppErrors";
import { peopleRepository } from "../repositories/peopleRepository";

export class PeopleController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    const people = peopleRepository.create({
      name,
    });

    await peopleRepository.save(people);

    return res.send("Pessoa criada com sucesso!").status(201);
  }

  async find(req: Request, res: Response) {
    const peoples = await peopleRepository.find();

    return res.json(peoples);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deletedPeople = await peopleRepository.delete(id);

    if (deletedPeople.affected === 0) throw new AppErrors("ID Inválido");

    return res.send("Pessoa deletada com sucesso!").status(201);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const updatedPeople = await peopleRepository.update(id, { name });

    if (updatedPeople.affected === 0) throw new AppErrors("ID Inválido");

    return res.send("Pessoa atualizado com sucesso!").status(201);
  }
}
