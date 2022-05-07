const User = require("../../Schema/user_detail");

const UpdateName = (req, res)=>{
    const loggedin_user_email = req.user_email;
    const new_first_name = req.body.new_first_name;
    const new_last_name = req.body.new_last_name;

    if(!new_first_name || !new_last_name){
        res.json({
            status: false,
            data: "Please Enter name."
        })
    }
    else{
        User.findOne({email: loggedin_user_email}).then(data=>{
            User.updateOne({$and: [{email: loggedin_user_email},{first_name: data.first_name},{last_name: data.last_name}]} , {
                first_name: new_first_name,
                last_name: new_last_name
            }).then(data=>{
                console.log("Printing updated name data", data);
                if(data.modifiedCount === 1 || data.matchedCount === 1 ){
                    res.json({
                        status: true,
                        data: "Name updated Successfully."
                    })
                }
                else{
                    res.json({
                        status: false,
                        data: "Given name doesn't match in database."
                    })
                }
            }).catch(err=>{console.log("Printing error while updating name",err)})
        }).catch(err=>{
            console.log("Prnting error while fetching data for loggedin user", err);
            res.json({
                status: false,
                data: "Invalid Data. Got Error while fetching data for loggedin user."
            })
        })
    }
};

module.exports = UpdateName;