import mongoose from 'mongoose';
import { Document, PaginateModel } from './index';
import paginate from 'mongoose-paginate-v2';
import { modelNames } from './names';

export const paginatedCompiledModel = <T>(
  name: (typeof modelNames)[keyof typeof modelNames],
  schema: mongoose.Schema<T>
) => {
  schema.plugin(paginate);
  return mongoose.model<Document<T>, PaginateModel<T>>(name, schema as any);
};
