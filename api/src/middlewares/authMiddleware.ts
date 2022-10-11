import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";
import { AppErrors } from "../errors/AppErrors";

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppErrors("Não autorizado", 401);
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppErrors("Não autorizado", 401);
  }

  const { password: _, ...loggedUser } = user;

  req.user = loggedUser;

  next();
};
