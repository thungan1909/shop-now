import * as zod from "zod";
import {
  invalidPasswordMsg,
  invalidUsernameMsg,
} from "../constants/message/validationMsg";

// LOG IN
export const UserLogInSchema = zod.object({
  username: zod.string().min(1, invalidUsernameMsg),
  password: zod.string().min(6, invalidPasswordMsg),
});

export type TUserLogInSchema = zod.infer<typeof UserLogInSchema>;
