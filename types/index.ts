export type LoginPayload = {
  username: any;
  password: any;
};
export type SignupPayload = {
  email: string;
  password: string;
};
export type EmailVerificationPayload = {
  email: string | any;
  code: string;
};
export type ResetPasswordPayload = {
  email: string | any;
  new_password: string;
  otp: string;
};
export type ForgetPasswordPayload = {
  email: string;
};
export type TabProps = {
  goToNext?: () => any;
  goToPrev?: () => any;
};
