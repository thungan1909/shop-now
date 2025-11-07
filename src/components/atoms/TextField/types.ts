export interface ITextField {
  value?: string;
  type?: "text" | "password" | "email" | "number" | "tel";
  placeholder?: string;
  label?: string;
}
