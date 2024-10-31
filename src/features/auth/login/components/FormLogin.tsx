"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
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
      await signIn("credentials", {
        ...data,
        departmentName: data?.department.name,
        departmentAddress: data?.department.address,
        redirect: false,
      });
      router.replace(data?.role !== "USER" ? "/dashboard" : "/");
      toast.success("Login success");
    },
    onError: ({ error }) => {
      toast.error(error.serverError.message);
    },
  });

  return (
    <Stack justify="center" maw="450px" h="100vh" mx="auto" px={{ base: "lg" }}>
      <form
        onSubmit={handleSubmit(async (values) => {
          await executeAsync(values);
        })}
      >
        <Title
          display={{ base: "block", sm: "none" }}
          pos="fixed"
          top={16}
          left={20}
        >
          Logo
        </Title>
        <Stack>
          <Box>
            <Title fz={{ base: "h2", sm: "h1" }}>Account Login PT XYZ</Title>
            <Text>Enter your details below.</Text>
          </Box>
          <TextInput
            size="md"
            label="Email"
            placeholder="Email"
            {...register("email")}
            error={errors.email?.message}
            required
          />
          <PasswordInput
            size="md"
            label="Password"
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message}
            required
          />
          <Button
            size="md"
            type="submit"
            w="100%"
            mt="lg"
            disabled={status === "executing"}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default FormLogin;
