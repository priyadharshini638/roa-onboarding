import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authStore } from "../store/authStore";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { loginSchema, type LoginFormValues } from "../schema/loginschema";
import { loginFields } from "../api/loginFields";

export default function PasswordLogin() {
  const login = authStore((s) => s.login);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const success = await login(values.email, values.password);

    if (success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("password", {
        type: "manual",
        message: "Invalid password",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-[#1a202c] font-bold text-3xl">Welcome Back!</div>
        <div className="text-[#535862]">
          Sign in to continue your onboarding process.
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {loginFields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1.5 mb-5">
            <label className="text-[#414651] text-sm font-medium">
              {field.label}
              {field.required && (
                <span className="text-[rgb(219,18,100)]"> *</span>
              )}
            </label>

            <Controller
              name={field.name}
              control={control}
              render={({ field: controllerField }) => (
                <Input
                  {...controllerField}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="text-base rounded-lg shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
                />
              )}
            />

            {errors[field.name] && (
              <p className="text-red-500 text-sm">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}

        <Button type="submit" className="w-full bg-[rgb(16,41,90)] rounded-lg">
          Get started
        </Button>
      </form>
    </>
  );
}
