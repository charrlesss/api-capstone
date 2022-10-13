import { AdminAccountModel } from "../schema/admin-acc-schema";


export async function get_admin_from_email(email:string) {
    return await AdminAccountModel.findOne({email});
  }

  export async function get_admin_from_id(id:any) {
    return await AdminAccountModel.findById(id);
  }

  export const store_refreshToken_from_admin = async (_id: any, token: string) => {
    return await AdminAccountModel
      .findById(_id)
      .updateOne({ refreshToken: [token] });
  };


  export const check_refreshToken_admin = async (_id: any, token: string) => {
    return await AdminAccountModel.findById(_id).where({refreshToken:token});
  };
  
  
  