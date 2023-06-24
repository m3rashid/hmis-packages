import { IDbSchemaKeys } from './index';

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
  announcement: 'Announcement',
  otp: 'Otp',
  payment: 'Payment',
	opd: 'Opd',
	ipd: 'Ipd',
	test: 'Test'
};
