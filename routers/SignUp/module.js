const User = require("../../Schema/user_detail");
const bcrypt = require("bcrypt");

const Module = (req, res)=>{
    const {first_name, last_name, email, phone, password, confirm_password, companyId, admin} = req.body;

    if(!first_name || !last_name || !email || !password || !phone || !confirm_password || !companyId || !admin){
        res.json({
            status: false,
            data: "Please fill all required fields."
        })
    }
    else{
        User.findOne({email: email}).then(async (data)=>{
            console.log("Printing data comes from finding email",data);
            if(data !== null){
                res.json({
                    status: false,
                    data: "User is already registered. Please login."
                })
            }
            else{
                User.findOne({phone: phone}).then(async (data)=>{
                    if(data !== null){
                        res.json({
                            status: false,
                            data: "Entered phone number is already registered. Please enter new phone number."
                        })
                    }
                    else{
                        let hashed_password;
                        if(password === confirm_password){
                            hashed_password = await bcrypt.hash(password, 13);
                        }
                        else{
                            res.json({
                                status: false,
                                data: "Confirm Password is not same as Password."
                            })
                        }
                        console.log("Printing hashed password", hashed_password);
                        User.insertMany([
                            {
                                first_name, last_name, email, phone, password: hashed_password, confirm_password: hashed_password, company_id: companyId, admin: admin
                            }
                        ]).then((data)=>{
                            if(data.length > 0){
                                res.json({
                                    status: true,
                                    data: "Data Added successfully."
                                })
                            }
                            else{
                                res.json({
                                    status: false,
                                    data: "Empty array."
                                })
                            }
                        }).catch(err=>{
                            console.log("Error while adding data to Database",err);
                            res.json({
                                status: false,
                                data: "Error while adding data to Database."
                            })
                        })
                    }
                }).catch(err=>{
                    res.json({
                        status: false,
                        data: "Invalid Data."
                    })
                })
            }
        }).catch(err=>{
            console.log("Error while fetching the data for given email id.",err);
            res.json({
                status: false,
                data: "Error while fetching data for given email."
            })
        });
        
    }
};

module.exports = Module;