import type { NextFunction, Request, Response } from 'express';
import type { z } from 'zod';

import type { IError } from '../utils/errors';
import { newZodErrors, useRoute } from '../utils/errors';

export const onlyValidate = (body: any, schema: z.ZodObject<any>): IError[] => {
  const result = schema.safeParse(body);
  if (!result.success) return newZodErrors(result.error.issues);
  return [];
};

export const errorShow = (errors: IError[]) => {
  return errors.map((err) => {
    let paths = '';
    err.path?.forEach((e) => {
      paths = paths + e + ', ';
    });
    return `${paths} is ${err.message}`;
  });
};

export const validate = (
  schema: z.ZodObject<any>
): ReturnType<typeof useRoute> => {
  return useRoute((req: Request, res: Response, next: NextFunction) => {
    onlyValidate(req.body, schema);
    next();
  });
};
