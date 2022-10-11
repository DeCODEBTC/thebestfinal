import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppErrors } from "../errors/AppErrors";

export class UserController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await userRepository.findOneBy({ email });

    if (userExists) throw new AppErrors("Email já existente!");

    const hashPassword = await bcrypt.hash(password, 8);

    const people = userRepository.create({
      email,
      password: hashPassword,
    });

    await userRepository.save(people);

    return res.send("Usuário criado com sucesso!").status(201);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) throw new AppErrors("E-mail  obrigatório");
    if (!password) throw new AppErrors("Senha obrigatória");

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new AppErrors("E-mail ou senha inválidos");
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new AppErrors("E-mail ou senha inválidos");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "1h",
    });

    const { password: undefined, ...userLogin } = user;

    return res.json({
      ...userLogin,
      token: token,
    });
  }
}
