const CompanyModel = require("../../Schema/company");

const AddCompanyModule = async (req, res)=>{
    console.log("Printing request body", req?.body);

    const { companyName, companyAddress, companyWebsite, companyContactNumber, companyEmailAddress } = req?.body;

    const findEmail = await CompanyModel.findOne({ company_email_address: companyEmailAddress });
    
    if(findEmail !== null){
        res.send({
            status: false,
            error: "Company Already Exists.!"
        })
    }
    else{
        const findPhone = await CompanyModel.findOne({ company_contact_number: companyContactNumber });

        if(findPhone !== null){
            res.send({
                status: false,
                error: "Company Already Exists.!"
            })
        }
        else{
            const payload = {
                company_name: companyName,
                company_address: companyAddress,
                company_website: companyWebsite,
                company_contact_number: companyContactNumber,
                company_email_address: companyEmailAddress
            };

            const addCompany = await CompanyModel.insertMany([
                payload
            ]);
            console.log("Printing add company", addCompany);
            console.log("Printing data", addCompany[0]._id);

            if(addCompany !== null){
                res.send({
                    status: true,
                    data: addCompany[0]._id,
                    message: "Company Added Successfully.!"
                })
            }
            else{
                res.send({
                    status: false,
                    error: "Somethng went wrong, Please try again later.!"
                })
            }
        }
    }
};

module.exports = AddCompanyModule;