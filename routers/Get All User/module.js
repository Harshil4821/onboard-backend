const User = require("../../Schema/user_detail");

const GetAllUser = (req, res)=>{

    const { companyId } = req?.body;
    console.log("Printing company id", companyId);

    User.find({company_id: companyId}).then(data=>{
        console.log("Printing data of All user.", data);
        if(data !== null){
            res.json({
                status: true,
                data: data
            })
        }
        else{
            res.json({
                status: false,
                data: "No Data Found."
            })
        }
    }).catch(err=>{
        console.log("Got Error while fetching all user data. Syntax Error. Invalid data.",err);
        res.json({
            status: false,
            data: "Invalid Data. Got Error while fetching all user data."
        })
    });
};

module.exports = GetAllUser;