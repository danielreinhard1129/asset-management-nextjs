import { Box, Title } from "@mantine/core";
import FormLogin from "./components/FormLogin";

const LoginPage = () => {
  return (
    <Box px="lg">
      <Box py="md">
        <Title size='h2'>Asset Management</Title>
      </Box>
      <Box mt="200px">
        <FormLogin />
      </Box>
    </Box>
  );
};

export default LoginPage;
