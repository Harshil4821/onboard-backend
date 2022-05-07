const UserModel = require("../../Schema/user_detail");
const CompanyModel = require("../../Schema/company");

const GetCompanyDetail = async (req, res)=>{
    console.log("Printing user email", req?.user_email);

    const findCompanyId = await UserModel.findOne({ email: req?.user_email });

    if(findCompanyId !== null){
        const companyId = findCompanyId?.company_id;

        const company = await CompanyModel.findById(companyId);

        if(company !== null){
            const users = await UserModel.find({ company_id: companyId });

            if(users !== null){
                res.send({
                    status: true,
                    company: company,
                    users: users
                })
            }
            else{
                res.send({
                    status: true,
                    company: company,
                    users: []
                })
            }
        }
        else{
            res.send({
                status: false,
                error: "Something went wrong, Please try again later.!"
            })
        }
    }
    else{
        res.send({
            status: false,
            error: "Something went wrong, Please try again later.!"
        })
    }
};

module.exports = GetCompanyDetail;