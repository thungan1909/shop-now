import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaKey, FaUser } from "react-icons/fa";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CTextField from "../components/atoms/CTextField/CTextField";
import CButton from "../components/atoms/CButton/CButton";
import { ROUTES_CONSTANTS } from "../routers/constants";
import { useLogin } from "../hooks/auth/login.hook";
import { notify } from "../utils/notifyUtils";
import { defaultErrorMsg } from "../constants/message/errorMsg";

import {
  UserLogInSchema,
  type TUserLogInSchema,
} from "../validation/user.schema";

const resolver = zodResolver(UserLogInSchema);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: exeLogin } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<TUserLogInSchema>({
    resolver,
    defaultValues: { username: "", password: "" },
    mode: "onChange",
  });

  const onSubmitLogin = (data: TUserLogInSchema) => {
    exeLogin(data, {
      onError: (error) => {
        notify.error(error.message || defaultErrorMsg);
      },
      onSuccess: () => {
        navigate(ROUTES_CONSTANTS.HOMEPAGE, { replace: true });
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <Typography variant="h4" className="font-bold mb-2">
            Welcome Back
          </Typography>
          <Typography variant="body1" className="text-gray-500">
            Login to your Shop Now account
          </Typography>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmitLogin)}
        >
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <CTextField
                  {...field}
                  type="text"
                  label="Username"
                  placeholder="Enter your username"
                  startIcon={<FaUser />}
                  className="w-full"
                />
                {fieldState.error && (
                  <Typography color="error" variant="caption" className="mt-1">
                    {fieldState.error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <CTextField
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  startIcon={<FaKey />}
                  className="w-full"
                />
                {fieldState.error && (
                  <Typography color="error" variant="caption" className="mt-1">
                    {fieldState.error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <div className="text-right">
            <CButton
              onClick={() => navigate(ROUTES_CONSTANTS.AUTH.RESET_PASSWORD)}
              variant="text"
              size="medium"
              textTransform="capitalize"
            >
              Forgot password?
            </CButton>
          </div>

          <CButton
            type="submit"
            disabled={!isValid}
            className="w-full py-3 text-lg font-medium"
            isRounded
          >
            Log In
          </CButton>

          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-2 text-center sm:text-left">
            <CButton
              onClick={() => navigate(ROUTES_CONSTANTS.AUTH.REGISTER)}
              variant="text"
              size="medium"
              textTransform="capitalize"
            >
              Create new account
            </CButton>

            <CButton
              onClick={() => navigate(ROUTES_CONSTANTS.AUTH.VERIFY_ACCOUNT)}
              variant="text"
              size="medium"
              textTransform="capitalize"
            >
              Verify account
            </CButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
