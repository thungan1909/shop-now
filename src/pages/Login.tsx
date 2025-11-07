import CTextField from "../components/atoms/TextField/CTextField";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  UserLogInSchema,
  type TUserLogInSchema,
} from "../validation/user.schema";
import { Typography } from "@mui/material";
const resolver = zodResolver(UserLogInSchema);

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<TUserLogInSchema>({
    resolver,
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
    <form>
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <CTextField
              {...field}
              type="text"
              label="Username"
              placeholder="Please input the username"
            />
            {fieldState.error && (
              <Typography color="error" variant="caption">
                {fieldState.error.message}
              </Typography>
            )}
          </>
        )}
      />
    </form>
  );
};

export default Login;
