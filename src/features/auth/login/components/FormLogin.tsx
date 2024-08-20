"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Fieldset, PasswordInput, TextInput } from "@mantine/core";
import { signIn } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginAction } from "../actions";
import { LoginSchema, LoginSchemaType } from "../schemas";

const FormLogin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const { executeAsync, status } = useAction(loginAction, {
    onSuccess: async ({ data }) => {
      await signIn("credentials", { ...data, redirect: false });
      router.replace(data?.role === "SUPER_ADMIN" ? "/dashboard" : "/");
      toast.success("Login success");
    },
    onError: ({ error }) => {
      toast.error(error.serverError.message);
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await executeAsync(values);
      })}
    >
      <Fieldset legend="Login Form" maw="500px" mx="auto">
        <TextInput
          label="Email"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          mt="md"
          {...register("password")}
          error={errors.password?.message}
        />
        <Button
          type="submit"
          w="100%"
          mt="xl"
          variant="gradient"
          disabled={status === "executing"}
        >
          Login
        </Button>
      </Fieldset>
    </form>
  );
};

export default FormLogin;
