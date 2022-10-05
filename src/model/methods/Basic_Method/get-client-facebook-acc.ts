import { clientFacebookAccountModel } from "../../schema/Basic_Model/client-facebook-acc.schema";

interface NewUser {
    name: string | undefined;
    email: string | undefined;
    profile: string | undefined;
  }
  
  export async function get_client_facebook_acc() {
    return await clientFacebookAccountModel.find({});
  }
  
  export const auth_user_with_facebook = async (
    email: string,
    params: NewUser
  ) => {
    const user = await clientFacebookAccountModel.findOne({ email: email });
    if (user) return user;
  
    return await (await clientFacebookAccountModel.create(params)).save();
  };
  
  export const store_refreshToken_facebook= async (_id: any, token: string) => {
    return await clientFacebookAccountModel.findById(_id).updateOne({refreshToken:[token]});
  };
  
  
  export const check_refreshToken_facebook = async (_id: any, token: string) => {
    return await clientFacebookAccountModel.findById(_id).where({refreshToken:token});
  };
  

  export const get_facebook_client_from_id = async (userId:any) => {
    return  await clientFacebookAccountModel.findById(userId)
  };
  

