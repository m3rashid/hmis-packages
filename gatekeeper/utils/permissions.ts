import { IDbSchemaKey, IPermission } from '../models';
import { modelNames } from '../models/names';

export const permissionValue = [1, 2, 4, 8, 16] as const;
export type PermissionValue = (typeof permissionValue)[number];

export const permissionKeys = [
  'READ',
  'CREATE',
  'UPDATE',
  'DELETE',
  'BULK_UPDATE',
] as const;
export type PermissionKey = (typeof permissionKeys)[number];

export type Permission = Record<PermissionKey, PermissionValue>;

export const PERMISSION: Permission = {
  READ: 1,
  CREATE: 2,
  UPDATE: 4,
  DELETE: 8,
  BULK_UPDATE: 16,
} as const;

export const hasPermission = (userPermission: number, checkFor: number) => {
  return (userPermission & checkFor) === checkFor;
};

export const transformPermission = (permission: number) => {
  const permissionArray: PermissionKey[] = [];
  for (let i = 0; i < permissionValue.length; i++) {
    if (hasPermission(permission, permissionValue[i])) {
      permissionArray.push(permissionKeys[i]);
    }
  }
  return permissionArray;
};

export const convertPermissionToReadable = (permission: IPermission) => {
  return Object.entries(permission).map(([key, value]) => ({
    [key]: transformPermission(value),
  }));
};

export const permissionBuilder = (
  permission: Partial<IPermission>
): IPermission => {
  const defaultPermissionValue = 0;

  return Object.keys(modelNames).reduce<IPermission>((acc, curr) => {
    const key = curr as IDbSchemaKey;
    return { ...acc, [key]: permission[key] || defaultPermissionValue };
  }, {} as IPermission);
};
