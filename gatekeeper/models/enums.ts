export const NOT_ALLOWED_ROLE_ACTUAL_NAMES = ['DEVELOPER', 'SUPER_ADMIN'];

export const APPOINTMENT_STATUS = [
  'PENDING',
  'ACCEPTED',
  'REJECTED',
  'RESOLVED',
] as const;

export const TIME_OF_DAY = ['BM', 'AF'] as const; // before meal, after meal

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

export const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;

export const LEAVE_STATUS = [
  'PENDING',
  'ACCEPTED',
  'REJECTED',
  'ENDED',
] as const;

export const PAYMENT_OPTIONS = [
  'CASH',
  'CREDIT_CARD',
  'DEBIT_CARD',
  'UPI',
  'NET_BANKING',
] as const;

export const TIME_UNITS = [
  'MINUTE',
  'HOUR',
  'DAY',
  'WEEK',
  'MONTH',
	'YEAR'
] as const;

export const PAYMENT_STATUS = ['PENDING', 'ACCEPTED', 'REJECTED'] as const;

export const OPD_STATUS = ['PENDING', 'RESOLVED', 'MIGRATED_TO_IPD'] as const;

export const IPD_STATUS = ['ADMITTED', 'DISCHARGED', 'DEAD'] as const;

export const APPOINTMENT_TYPE = ['WALK_IN', 'MOBILE_CALL'] as const;
