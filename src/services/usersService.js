import { post } from "../utils/request";

export const login = async (options) => {
  const result = await post("user/login", options)
  return result;
}

export const register = async (options) => {
  const result = await post("user/register", options)
  return result;
}

export const forgotPassword = async (options) => {
  const result = await post ("user/password/forgot", options);
  return result;
}

export const otpVerify = async (options) => {
  const result = await post ("user/password/otp", options);
  return result;
}

export const resetPassword = async (options) => {
  const result = await post ("user/password/reset", options);
  return result;
}