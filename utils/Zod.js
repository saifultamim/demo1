import { z } from "zod";

// Only digits regex
const phoneNumberRegex = /^[0-9]+$/;

// Registration schema
export const registrationSchema = z
  .object({
    bizid: z.number().optional(),
    xstuname: z.string().min(2, "Name must be at least 2 characters"),
    xmobile: z
      .string({ required_error: "Mobile number is requierd" })
      .min(1, "Mobile number is required")
      .regex(phoneNumberRegex, "Invalid number")
      .refine((val) => val.length === 11 || val.length === 13 || val.length === 10 || val.length === 14 , {
        message: "Invalid number",
      }),
    xstuemail: z.string().email("Invalid email address"),
    xpassword: z.string().min(6, "Password must be at least 6 characters"),
    xcpassword: z.string(),
    xfmobile: z
      .string()
      .refine((val) => val === "" || phoneNumberRegex.test(val), "Invalid number")
      .refine((val) => val.length === 0 || val.length === 11 || val.length === 13, {
        message: "Invalid number",
      })
      .optional(),
    xguardian: z.string().optional(),
    xgurdianmobile: z
      .string()
      .refine((val) => val === "" || phoneNumberRegex.test(val), "Invalid number")
      .refine((val) => val.length === 0 || val.length === 11 || val.length === 13 || val.length === 10 , {
        message: "Invalid Number",
      })
      .optional(),
    xaddress: z.string().optional(),
    xrefno: z.string().optional(),
    xnid: z.string().optional(),
    xdistrict: z.string().optional(),
    xcountry: z.string().optional(),
    xsex: z.string().optional(),
    xmobile:z.string({required_error:"Number should be at least 11 characters"})
  })
  .refine((data) => data.xpassword === data.xcpassword, {
    message: "Passwords don't match",
    path: ["xcpasswrd"], 
  })
  .refine((data)=> data.xnumber===data.xcnumber,{
    message:"Number don't match",
    path:["xcnumber"]
  });
