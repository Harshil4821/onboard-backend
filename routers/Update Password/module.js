const User = require("../../Schema/user_detail");
const bcrypt = require("bcrypt");

const UpdatePassword = (req, res)=>{
    const loggedin_user_email = req.user_email;
    const {old_password, new_password, confirm_new_password} = req.body;

    if(!old_password || !new_password || !confirm_new_password){
        res.json({
            status: false,
            data: "Please fill all required fields."
        })
    }
    else{
        User.findOne({email: loggedin_user_email}).then(async (data)=>{
            console.log("Printing data comes from update password", data);
            const user_data = data;
            const is_old_password = await bcrypt.compare(old_password, user_data.password);
            if(is_old_password){
                const is_password_same = await bcrypt.compare(new_password, user_data.password);
                console.log("Is old and new password are same?", is_password_same);
                if(is_password_same){
                    res.json({
                        status: false,
                        data: "Old and New password are same. Please enter mew password."
                    })
                }
                else{
                    if(new_password === confirm_new_password){
                        const hashed_password = await bcrypt.hash(new_password, 13);
                        console.log("Printing hashed password", hashed_password);

                        User.findOneAndUpdate({email: loggedin_user_email}, {
                            password: hashed_password,
                            confirm_password: hashed_password
                        }).then((data)=>{
                            console.log("Printing updated data", data);
                            // res.send("Password updated successfully.");
                            if(data !== null || data.length > 0){
                                res.json({
                                    status: true,
                                    data: "Password updated successfully."
                                })
                            }
                            else{
                                res.json({
                                    status: false,
                                    data: "Invalid data. Data null or empty array."
                                })
                            }
                        }).catch((err)=>{
                            console.log("Error while updating password", err);
                            res.json({
                                status: false,
                                data: "Invalid Data. Error while updating password."
                            })
                        })
                    }
                    else{
                        res.json({
                            status: false,
                            data: "New Password and Confirm password is not match."
                        })
                    }
                }
            }
            else{
                res.json({
                    status: false,
                    data: "Invalid Old Password."
                })
            }
        }).catch((err)=>{
            console.log("Error while getting data for loggedin user", err);
            res.json({
                status: false,
                data: "Invalid Data. Error while getting data for loggedin user."
            })
        })
    }
};

module.exports = UpdatePassword;