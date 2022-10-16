import { clienGoogletAccountModel } from '../schema/client-google-acc.schema'

interface NewUser {
  name: string | undefined;
  email: string | undefined;
  profile: string | undefined;
  auth_type: string;
}

export async function get_client_google_acc() {
  return await clienGoogletAccountModel.find({});
}

export const auth_user_with_google = async (
  email: string,
  params: NewUser
) => {
  const user = await clienGoogletAccountModel.findOne({ email: email });
  if (user) return user;

  return await (await clienGoogletAccountModel.create(params)).save();
};

export const store_refreshToken_google = async (_id: any, token: string) => {
  return await clienGoogletAccountModel.findById(_id).updateOne({refreshToken:[token]});
};


export const check_refreshToken_google = async (_id: any, token: string) => {
  return await clienGoogletAccountModel.findById(_id).where({refreshToken:token});
};

export const get_google_client_from_id = async (userId:any) => {
  return  await clienGoogletAccountModel.findById(userId)
};

export  const get_user_by_email_goggle = async(email:string | undefined)=>{
  return await clienGoogletAccountModel.findOne({email});
}


