import Toast from "react-native-toast-message";
export * from "./checkAuth";
export * from "./fonts";
export * from "./globalStyles";

export const showToast = ({
  label,
  message,
  type,
}: {
  type: "error" | "info" | "success";
  label: string;
  message: string;
}) => {
  Toast.show({
    type: type,
    text1: label,
    text2: message,
    visibilityTime: 5000,
    topOffset: 60,
  });
};
export const formatWithCommas = (value?: string | number) => {
  if (value === null || value === undefined || value === "") return "";

  const stringValue = String(value).replace(/,/g, "");
  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const EXPENSE_TYPES = [
  { label: "Income", value: "income" },
  { label: "Other Income", value: "other_incomes" },
  { label: "Operating Expenses", value: "operating_expenses" },
  { label: "Other Expenses", value: "other_expenses" },
  { label: "Life Insurance", value: "life_insurance" },
  { label: "House Rent", value: "house_rent" },
  { label: "Statutory Deductions", value: "statutory_deductions" },
];

export const EMPLOYMENT_TYPES = [
  { label: "Salaried", value: "salaried" },
  { label: "Self Employed", value: "self_employed" },
];

export const STATES = [
  { label: "Abia", value: "abia" },
  { label: "Adamawa", value: "adamawa" },
  { label: "Akwa Ibom", value: "akwa_ibom" },
  { label: "Anambra", value: "anambra" },
  { label: "Bauchi", value: "bauchi" },
  { label: "Bayelsa", value: "bayelsa" },
  { label: "Benue", value: "benue" },
  { label: "Borno", value: "borno" },
  { label: "Cross River", value: "cross_river" },
  { label: "Delta", value: "delta" },
  { label: "Ebonyi", value: "ebonyi" },
  { label: "Edo", value: "edo" },
  { label: "Ekiti", value: "ekiti" },
  { label: "Enugu", value: "enugu" },
  { label: "Gombe", value: "gombe" },
  { label: "Imo", value: "imo" },
  { label: "Jigawa", value: "jigawa" },
  { label: "Kaduna", value: "kaduna" },
  { label: "Kano", value: "kano" },
  { label: "Katsina", value: "katsina" },
  { label: "Kebbi", value: "kebbi" },
  { label: "Kogi", value: "kogi" },
  { label: "Kwara", value: "kwara" },
  { label: "Lagos", value: "lagos" },
  { label: "Nasarawa", value: "nasarawa" },
  { label: "Niger", value: "niger" },
  { label: "Ogun", value: "ogun" },
  { label: "Ondo", value: "ondo" },
  { label: "Osun", value: "osun" },
  { label: "Oyo", value: "oyo" },
  { label: "Plateau", value: "plateau" },
  { label: "Rivers", value: "rivers" },
  { label: "Sokoto", value: "sokoto" },
  { label: "Taraba", value: "taraba" },
  { label: "Yobe", value: "yobe" },
  { label: "Zamfara", value: "zamfara" },
  { label: "Federal Capital Territory", value: "fct" },
];
