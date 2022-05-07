const User = require("../../Schema/user_detail");

const UpdateUser = (req, res)=>{
    const loggedin_user_email = req.user_email;
    const {first_name, last_name, phone} = req.body;

    if(!first_name && !last_name && !phone){
        res.json({
            status: false,
            data: "Please fill all required fields."
        })
    }
    else{
        User.find({phone: phone}).then((data)=>{
            if(data.length > 0){
                res.json({
                    status: false,
                    data: "Invalid Phone number. Please enter valid phone number."
                })
            }
            else{
                User.findOne({email: loggedin_user_email}).then((data)=>{
                    if(data.phone === phone){
                        res.json({
                            status: false,
                            data: "Both phone number are same. Please enter updated phone number."
                        })
                    }
                    else if(data.first_name === first_name){
                        res.json({
                            status: false,
                            data: "Both first name are same. Please enter updated first name."
                        })
                    }
                    else if(data.last_name === last_name){
                        res.json({
                            status: false,
                            data: "Both last name are same. Please enter updated last name."
                        })
                    }
                    else{
                        User.findOneAndUpdate({email: loggedin_user_email}, {
                            first_name: first_name,
                            last_name: last_name,
                            phone: phone
                        }).then((data)=>{
                            console.log("Updated data", data);
                            // res.send("Profile updated successfully.");
                            if(data !== null || data?.length > 0){
                                res.json({
                                    status: true,
                                    data: data
                                })
                            }
                            else{
                                res.json({
                                    status: false,
                                    data: "Null data."
                                })
                            }
                        }).catch((err)=>{
                            console.log("Error while updating data", err);
                            res.json({
                                status: false,
                                data: "Invalid Data."
                            })
                        })
                    }
                })
            }
        }).catch((err)=>{
            console.log("Got error while checking phone validation.", err);
            res.json({
                status: false,
                data: "Invalid Data."
            })
        })
        
    }
};

module.exports = UpdateUser;