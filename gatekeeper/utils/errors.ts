import type { NextFunction, Request, Response } from 'express';
import type { ZodError } from 'zod';

export interface IError {
  name: string;
  message: string;
  path?: string[];
}

export const newError = (
  msg: IError['message'],
  err?: Partial<Omit<IError, 'message'>>,
  path?: string[]
) => {
  return {
    message: msg,
    name: err?.name ?? msg,
    path: path,
  } as IError;
};

export const newZodErrors = (errors: ZodError['issues']) => {
  if (errors.length === 0) return [];
  const newErrors = errors.map((err) => {
    return {
      path: err.path,
      name: 'ZOD_ERROR',
      message: err.message,
    } as IError;
  });

  return newErrors;
};

export const useRoute =
  (check: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(check(req, res, next)).catch(next);
  };

export const globalErrorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  return res.status(500).json(err);
};
