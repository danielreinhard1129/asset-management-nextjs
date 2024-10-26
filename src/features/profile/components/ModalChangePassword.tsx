import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, PasswordInput, Stack } from "@mantine/core";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useChangePassword from "../api/useChangePasssword";

interface ModalChangePasswordProps {
  opened: boolean;
  onClose: () => void;
}

const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(6),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be no more than 20 characters long")
      .regex(/[A-Z]/, "Password must have at least one uppercase letter")
      .regex(/[0-9]/, "Password must have at least one number"),
    confirmPassword: z.string().min(6, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password cannot be the same as old password",
  });

type ChangePasswordFormValues = z.infer<typeof ChangePasswordSchema>;

const ModalChangePassword: FC<ModalChangePasswordProps> = ({
  opened,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const { mutateAsync: changePassword } = useChangePassword();

  const onSubmit = async (data: ChangePasswordFormValues) => {
    const result = await changePassword(data);
    if (result.message) {
      onClose();
      reset();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Change Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <PasswordInput
            label="Old Password"
            placeholder="Old Password"
            {...register("oldPassword")}
            error={errors.oldPassword?.message}
          />
          <PasswordInput
            label="New Password"
            placeholder="New Password"
            {...register("newPassword")}
            error={errors.newPassword?.message}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button fullWidth type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ModalChangePassword;
