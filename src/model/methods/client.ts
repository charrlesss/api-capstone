import { User } from "../../config/types";
import { clientAccountModel } from "../schema/client-acc.schema";
interface NewUser {
  name: string;
  password: string;
  profile: string;
  gender: string;
  email: string;
  birthdate: string;
}

export async function get_client() {
  return await clientAccountModel.find({});
}

export const auth_user = async (email: string, params: NewUser) => {
  const user = await clientAccountModel.findOne({ email: email });
  if (user) return { message: "this email is already used.", success: false };

  await (await clientAccountModel.create(params)).save();
  return { message: "Successfuly create account.", success: true };
};

export const store_refreshToken = async (_id: any, token: string) => {
  return await clientAccountModel
    .findById(_id)
    .updateOne({ refreshToken: [token] });
};

export const check_refreshToken = async (_id: any, token: string) => {
  return await clientAccountModel.findById(_id).where({ refreshToken: token });
};

export const get_client_from_email = async (
  email: string
): Promise<User | null> => {
  return await clientAccountModel.findOne({ email: email });
};

export const update_refreshToken = async (
  userId: any,
  refreshtoken: string
) => {
  return await clientAccountModel
    .findById(userId)
    .updateOne({ refreshToken: [refreshtoken] });
};

export const get_client_from_id = async (userId: any) => {
  return await clientAccountModel.findById(userId);
};

export const store_new_user = async (params: NewUser) => {
  return await (await clientAccountModel.create(params)).save();
};

export const verify_code_send = async (email: string, code: string) => {
  return await clientAccountModel
    .findOne({ email: email })
    .where({ verifyCode: code });
};

export const remove_acc_by_email = async (email: string) => {
  return await clientAccountModel.findOneAndRemove({ email: email });
};
