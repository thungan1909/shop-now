import CTextField from "../components/atoms/CTextField/CTextField";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaKey, FaUser } from "react-icons/fa";
import {
  UserLogInSchema,
  type TUserLogInSchema,
} from "../validation/user.schema";
import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import CButton from "../components/atoms/CButton/CButton";
import { ROUTES_CONSTANTS } from "../routers/constants";
import { useLogin } from "../hooks/auth/login.hook";
import { notify } from "../utils/notifyUtils";
import { defaultErrorMsg } from "../constants/message/errorMsg";
const resolver = zodResolver(UserLogInSchema);

const Login = () => {
  const navigate = useNavigate();
  const { mutate: exeLogin } = useLogin();

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
  const onSubmitLogin = (data: TUserLogInSchema) => {
    exeLogin(data, {
      onError: (error) => {
        notify.error(error.message || defaultErrorMsg);
      },
      onSuccess: () => {
        console.log("navi");
        navigate(ROUTES_CONSTANTS.DASHBOARD, { replace: true });
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Typography variant="h5">Login</Typography>
      <Typography className="text-center">
        Welcome to
        <span className="ml-1" style={{ color: "var(--main-600)" }}>
          Show Now
        </span>
      </Typography>
      <form
        className="flex flex-col gap-6 w-full"
        onSubmit={handleSubmit(onSubmitLogin)}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <>
                  <CTextField
                    {...field}
                    type="text"
                    label="Username"
                    placeholder="Username"
                    className="w-full"
                    startIcon={<FaUser />}
                  />
                  {fieldState.error && (
                    <Typography color="error" variant="caption">
                      {fieldState.error.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </div>
          <div className="flex flex-col">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <>
                  <CTextField
                    {...field}
                    type="password"
                    label="Password"
                    placeholder="Password"
                    className="w-full"
                    startIcon={<FaKey />}
                  />
                  {fieldState.error && (
                    <Typography color="error" variant="caption">
                      {fieldState.error.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </div>

          <div className="!text-end">
            <CButton
              onClick={() => {
                navigate(ROUTES_CONSTANTS.AUTH.RESET_PASSWORD);
              }}
              variant="text"
              size="large"
              textTransform="capitalize"
            >
              Forgot your password?
            </CButton>
          </div>
        </div>

        <CButton type="submit" disabled={!isValid} className="w-full" isRounded>
          Log In
        </CButton>

        <div className="flex justify-between">
          <CButton
            onClick={() => {
              navigate(ROUTES_CONSTANTS.AUTH.REGISTER);
            }}
            variant="text"
            size="large"
            textTransform="capitalize"
          >
            Create new account
          </CButton>

          <CButton
            onClick={() => {
              navigate(ROUTES_CONSTANTS.AUTH.VERIFY_ACCOUNT);
            }}
            variant="text"
            size="large"
            textTransform="capitalize"
          >
            Verify your account
          </CButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
