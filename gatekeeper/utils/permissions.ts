import { modelNames } from '../models/names';
import { IDbSchemaKey, IPermission } from '../models';

export const permissionValue = [1, 2, 4, 8, 16, 32, 64] as const;
export type PermissionValue = (typeof permissionValue)[number];

export const permissionKeys = [
  'READ_SELF',
  'READ_ALL',
  'CREATE',
  'UPDATE_SELF',
  'UPDATE_ALL',
  'DELETE_SELF',
  'DELETE_ALL',
] as const;
export type PermissionKey = (typeof permissionKeys)[number];

export type Permission = Record<PermissionKey, PermissionValue>;

export const PERMISSION: Permission = {
  READ_SELF: permissionValue[0],
  READ_ALL: permissionValue[1],
  CREATE: permissionValue[2],
  UPDATE_SELF: permissionValue[3],
  UPDATE_ALL: permissionValue[4],
  DELETE_SELF: permissionValue[5],
  DELETE_ALL: permissionValue[6],
} as const;

export const convertPermissionsToNumber = (permissionsArr: string[]) => {
  let permissionNo = 0;
  for (let i = 0; i < permissionsArr.length; i++) {
    if (permissionKeys.includes(permissionsArr[i] as any)) {
      permissionNo += PERMISSION[permissionsArr[i] as PermissionKey];
    }
  }
  return permissionNo;
};

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

export const permissionBuilder = ({
  permission,
  defaultAccess,
}: {
  permission: Partial<IPermission>;
  defaultAccess: PermissionValue;
}): IPermission => {
  return Object.keys(modelNames).reduce<IPermission>((acc, curr) => {
    const key = curr as IDbSchemaKey;
    return { ...acc, [key]: permission[key] || defaultAccess };
  }, {} as IPermission);
};
