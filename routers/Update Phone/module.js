const User = require("../../Schema/user_detail");

const UpdatePhone = (req, res)=>{
    const loggedin_user_email = req.user_email;
    const new_phone = req.body.new_phone;

    User.findOne({email: loggedin_user_email}).then(data=>{
        console.log("Printing data for loggedin user email, phone", data);
        if(data?.length > 0 || data !== null){
            User.find({phone: new_phone}).then(data1=>{
                console.log("Printing data for finding phone.", data1);
                if(data1?.length > 0){
                    res.json({
                        status: false,
                        data: "Given phone number is already registered. Please enter a different number."
                    })
                }
                else{
                    User.updateOne({$and: [{email: loggedin_user_email},{phone: data.phone}]}, {
                        phone: new_phone
                    }).then(data=>{
                        if(data.matchedCount === 1 || data.modifiedCount === 1){
                            res.json({
                                status: true,
                                data: "Phone number updated successfully."
                            })
                        }
                        else{
                            res.json({
                                status: false,
                                data: "Unable to find phone number and update phone number."
                            })
                        }
                    })
                }
            })
        }
    }).catch(err=>{
        res.json({
            status: "Invalid Data. Can't find the email."
        })
    })
};

module.exports = UpdatePhone;