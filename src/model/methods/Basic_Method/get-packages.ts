import { packagesModel } from './../../schema/Basic_Model/packages.schema';

export   async function get_package() {
  return await packagesModel.find({})
}
