import mongoose from 'mongoose';

export interface ILoginUser {
  _id: string;
  roles: any;
  name: string;
  email: string;
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
  password: string;
  roles: IRole[];
  profile: IProfile;
}

export const SEX = ['M', 'F', 'O'] as const; // male, female, other
export const MARITAL_STATUS = ['S', 'M', 'D', 'W'] as const; // Single, Married, Divorced, Widowed
export const BLOOD_GROUPS = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
] as const;

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

export const NOT_ALLOWED_ROLE_ACTUAL_NAMES = ['DEVELOPER', 'SUPER_ADMIN'];

type SpecialResource = 'ALL' | 'INDEPENDENT';
export interface IPermission {
  [resourceTypeName: string]: {
    [permission: string]: SpecialResource | string[]; // <ObjectId> | 'SELF'
  };
}

export interface IRole extends IBaseModel {
  displayName: string;
  actualName: string;
  description?: string;
  permissions: IPermission;
}

export interface IAttendance {
  _id: string;
  userId: IUser;
  date: Date;
  slots: Array<{
    from: Date;
    to: Date;
  }>;
}

export const DAYS: readonly string[] = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
];

export interface IAvailability extends IBaseModel {
  day: string;
  startTime: string;
  endTime: string;
  profile: IProfile;
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

export const APPOINTMENT_STATUS = [
  'PENDING',
  'ACCEPTED',
  'REJECTED',
  'RESOLVED',
] as const;

export interface IAppointment extends IBaseModel {
  doctor: IUser;
  patient: IUser;
  status: string;
  chats: Array<{
    time: Date;
    remarks?: string;
    from: IUser; // maybe the receptionist/doctor, to patient
  }>;
  referredBy?: IUser;
  prescription: IPrescription;
}

export interface INotification extends IBaseModel {
  title: string;
  description: string;
}

export const TIME_OF_DAY = ['BM', 'AF'] as const; // before meal, after meal

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

export const LEAVE_STATUS = [
  'PENDING',
  'ACCEPTED',
  'REJECTED',
  'ENDED',
] as const;

export interface ILeave extends IBaseModel {
  startDate: Date;
  endDate: Date;
  reason: string;
  user: IUser;
  status: string;
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
  notification: INotification;
}>;

export type Document<T> = Omit<mongoose.Document, '_id'> & T;
export type PaginateModel<T> = mongoose.PaginateModel<Document<T>>;

export type IDbSchemaKeys = keyof ModelSchemasTypes;

export const modelNames: Record<IDbSchemaKeys, string> = {
  address: 'Address',
  appointment: 'Appointment',
  availability: 'Availability',
  consumable: 'Consumable',
  leave: 'Leave',
  nonConsumable: 'NonConsumable',
  prescription: 'Prescription',
  profile: 'Profile',
  role: 'Role',
  user: 'User',
  attendance: 'Attendance',
  notification: 'Notification',
};
