export type LoginPayload = {
  username: string;
  password: string;
};
export type SignupPayload = {
  email: string;
  password: string;
};
export type EmailVerificationPayload = {
  email: string | any;
  code: string;
};
export type ForgetPasswordPayload = {
  email: string;
};
