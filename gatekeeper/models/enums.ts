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

export const DAYS: readonly string[] = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
];

export const LEAVE_STATUS = [
  'PENDING',
  'ACCEPTED',
  'REJECTED',
  'ENDED',
] as const;
