export interface IUserDTO {
  id: string;
  userName: string;
  email?: string;
  emailConfirmed: boolean;
  firstName?: string;
  lastName?: string;
  forcePasswordChange: boolean;
  isAdministrator: boolean;
  lockedState: boolean;
  lockoutEnabled: boolean;
  lockoutEnd?: Date;
  memberId?: string;
  passwordExpired: boolean;
  phoneNumber?: string;
  photoUrl?: string;
  accessFailedCount: number;
  twoFactorEnabled: boolean;
  userType?: string;
}
