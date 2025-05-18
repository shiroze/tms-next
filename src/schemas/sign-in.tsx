import {object, string} from "yup"
 
export const signInSchema = object({
  email: string().required("Email is required")
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string().required("Password is required")
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})