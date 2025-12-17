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
export type ChangePasswordPayload = {
  old_password: string | any;
  new_password: string;
};
export type ForgetPasswordPayload = {
  email: string;
};
export type TabProps = {
  goToNext?: (index?: number) => any;
  goToPrev?: (index?: number) => any;
  setEstimatedTax?: (value: number) => void;
};
export type EstimateTaxPayload = {
  employment_income?: "string";
  business_income?: string;
  other_income?: string;
  chargeable_gains?: string;
  losses_allowed?: string;
  capital_allowances?: string;
  national_housing_fund?: string;
  National_health_insurance_scheme?: string;
  pension_contribution?: string;
  mortgage_interest?: string;
  life_insurance_premium?: string;
  house_rent?: string;
  period?: string;
  employment_type?: string;
};
export type ExpensesPayload = {
  category?: any;
  document_name?: any;
  amount?: any;
  relevant_tax_year?: any;
  file?: any;
};
