import * as ERRORS from './utils/errors';

import * as addressValidator from './validators/address';
import * as appointmentValidator from './validators/appointment';
import * as attendanceValidator from './validators/attendance';
import * as authValidator from './validators/auth';
import * as availabilityValidator from './validators/availability';
import * as baseValidator from './validators/base';
import * as inventoryValidator from './validators/inventory';
import * as ipdValidator from './validators/ipd';
import * as leaveValidator from './validators/leave';
import * as notificationValidator from './validators/notification';
import * as opdValidator from './validators/opd';
import * as paymentValidator from './validators/payment';
import * as prescriptionValidator from './validators/prescription';
import * as roleValidator from './validators/role';
import * as testValidator from './validators/test';
import * as Validator from './validators';
import * as MODELS from './models/index';
import * as ENUMS from './models/enums';
import { modelNames } from './models/names';

export {
  ERRORS,
  MODELS,
  addressValidator,
  appointmentValidator,
  availabilityValidator,
  leaveValidator,
  notificationValidator,
  prescriptionValidator,
  authValidator,
  baseValidator,
  inventoryValidator,
  roleValidator,
  attendanceValidator,
  ipdValidator,
  opdValidator,
  paymentValidator,
  testValidator,
  Validator,
  ENUMS,
  modelNames,
};
