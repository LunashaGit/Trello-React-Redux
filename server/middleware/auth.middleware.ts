import { Request, Response, NextFunction } from "express";

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = res.locals;
  if (user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  if (token) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
