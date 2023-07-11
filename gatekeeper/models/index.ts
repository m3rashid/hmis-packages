import mongoose from 'mongoose';
import 'mongoose-paginate-v2';
import { TASK_STATUS } from './enums';

export interface ILoginUser {
  _id: string;
  role: any;
  name: string;
  email: string;
}

export interface IOtp {
  _id: string;
  otp: string;
  email: string;
  expiry: Date;
}

export interface IBaseModel {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  createdBy?: IUser;
  lastUpdatedBy?: IUser;
}

export interface IUser extends IBaseModel {
  name: string;
  email: string;
  emailVerified: boolean;
  isDoctor: boolean;
  origin: string;
  password: string;
  role?: IRole;
  profile: IProfile;
}

export interface IProfile extends IBaseModel {
  bio?: string;
  roomNumber?: string;
  age?: number;
  sex: string;
  phone?: string;
  phoneVerified: boolean;
  maritalStatus?: string;
  profilePicture?: string;
  addresses?: IAddress[];
  bloodGroup?: string;
  origin?: string;
  lastVisit?: Date;
  designation?: string;
  department?: string;
  userHealthId?: string;
  user: IUser;
  leaves: ILeave[];
  availabilities: IAvailability[];
  appointmentsAsDoctor: IAppointment[];
  appointmentsAsPatient: IAppointment[];
  appointmentsAsReferredBy: IAppointment[];
}

export type IPermission = Record<IDbSchemaKey, number>;

export interface IRole extends IBaseModel {
  name: string;
  permissions: IPermission;
}

export interface IAttendance {
  _id: string;
  userId: IUser;
  date: Date;
  slots: Array<{ from: Date; to: Date }>;
}

export interface IAvailability extends IBaseModel {
  day: string;
  startTime: Date;
  endTime: Date;
  user: IUser;
}

export interface IAddress extends IBaseModel {
  city: string;
  state: string;
  pinCode: string;
  country: string;
  roomNumber?: string;
  buildingNumber?: string;
  user: IProfile;
}

export interface IOpd extends IBaseModel {
  appointment: IAppointment;
  prescription: IPrescription;
  status: string;
  payment?: IPayment;
  date: Date;
  nextDate?: Date;
}

export interface IIpd extends IBaseModel {
  patient: IUser;
  status: string;
  payments: Array<IPayment>;
  history: Array<{
    prescriptions: IPrescription;
    doctor: IUser;
  }>;
  resources: Array<{
    nonConsumable?: INonConsumable;
    consumables?: IConsumable;
    time?: number;
    timeUnit?: string;
  }>;
  tests: Array<{
    test: ITest;
    remarks?: string;
    suggestedBy: IUser;
    payment?: IPayment;
  }>;
  referredBy?: IUser;
  chats: Array<{
    time: Date;
    remarks?: string;
    from: IUser; // maybe the receptionist/doctor, to patient
  }>;
  fromDate: Date;
  toDate?: Date;
}

export interface IAppointment extends IBaseModel {
  doctor: IUser;
  patient: IUser;
  status: string;
  payment?: IPayment;
  type?: string;
  timeMinutes: number; // expected time in minutes
  date: Date;
}

export interface ITest extends IBaseModel {
  name: string;
  description?: string;
  costINR: number;
}

export interface IPayment extends IBaseModel {
  type: string;
  amountINR: number;
  status: string;
  reason?: string;
}

export interface IAnnouncement extends IBaseModel {
  title: string;
  description: string;
}

export interface IPrescription extends IBaseModel {
  remarks?: string;
  appointment: IAppointment;
  medicines: Array<{
    medicine: IConsumable;
    dosage: {
      perDay: number;
      timeOfDay?: string;
      durationInDays?: number;
      perWeek: number; // number of days in a week
    };
  }>;
}

export interface IConsumable extends IBaseModel {
  name: string;
  quantityLeft: number;
  quantityPerUnit: number;
  batchNumber?: string;
  expiryDate?: Date;
  manufacturer?: string;
  lastOrderDate?: Date;
  nextOrderDate?: Date;
}

export interface INonConsumable extends IBaseModel {
  name: string;
  quantityLeft: number;
  manufacturer?: string;
  lastServicingDate?: Date;
  nextServicingDate?: Date;
}

export interface ILeave extends IBaseModel {
  startDate: Date;
  endDate: Date;
  reason: string;
  user: IUser;
  status: string;
}

export type ITaskStatus = (typeof TASK_STATUS)[number];

export interface ISubTask extends IBaseModel {
  title: string;
  image?: string;
  description?: string;
  status: ITaskStatus;
  expectedCompletionTime: Date;
}

export interface ITask extends IBaseModel {
  title: string;
  images?: string[];
  description?: string;
  assignedTo: IUser[];
  subTasks: ISubTask[];
  status: ITaskStatus;
  expectedCompletionTime: Date;
}

export interface IDashboardWidget extends IBaseModel {
  title: string;
  description: string;
  aggregation: Array<Record<string, any>>;
  kpiIndicator?: string;
  kpiValue?: string;
  modelName: IDbSchemaKey;
  durationMonths: number;
  chartType: string;
  height: number;
  width: number;
}

export type ModelSchemasTypes = Readonly<{
  address: IAddress;
  appointment: IAppointment;
  availability: IAvailability;
  consumable: IConsumable;
  leave: ILeave;
  nonConsumable: INonConsumable;
  prescription: IPrescription;
  profile: IProfile;
  role: IRole;
  user: IUser;
  attendance: IAttendance;
  announcement: IAnnouncement;
  otp: IOtp;
  opd: IOpd;
  ipd: IIpd;
  test: ITest;
  payment: IPayment;
  taskStatus: ITaskStatus;
  subTask: ISubTask;
  task: ITask;
  dashboardWidget: IDashboardWidget;
}>;

export type Document<T> = Omit<mongoose.Document, '_id'> & T;
export type PaginateModel<T> = mongoose.PaginateModel<Document<T>>;

export type IDbSchemaKey = keyof ModelSchemasTypes;

export interface PaginatedListIResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
