// loginFields.ts
export const loginFields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your Email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
] as const;
