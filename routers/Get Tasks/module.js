const User = require("../../Schema/user_detail");
const Task = require("../../Schema/tasks");

const GetTasks = (req, res)=>{
    const loggedin_user_email = req.user_email;
    
    User.findOne({email: loggedin_user_email}).then((data)=>{
        console.log("Printing user data from Get tasks", data);
        if(data.admin === true && data !== null){
            Task.find({company_id: data?.company_id, status: { $ne: "Completed" }}).then((data)=>{
                console.log("Printing tasks for admin", data);
                // res.json(data);
                if(data !== null){
                    res.json({
                        status: true,
                        data: data
                    })
                }
                else{
                    res.json({
                        status: false,
                        data: "No Data Found. For Admin user."
                    })
                }
            }).catch(err=>{
                console.log("Error while fetching task for admin", err);
                res.json({
                    status: false,
                    data: "Invalid Data. Error while fetching task for Admin."
                })
            })
        }
        else if(data.admin !== true && data !== null){
            Task.find({assigned: loggedin_user_email, coompany_id: data?.company_id, status: { $ne: "Completed" }}).then((data)=>{
                console.log("Printing task of normal user", data);
                if(data !== null){
                    res.json({
                        status: true,
                        data: data
                    })
                }
                else{
                    res.json({
                        status: false,
                        data: "No Data Found. For Normal user."
                    })
                }
            }).catch(err=>{
                console.log("Error while getting task for normal user", err);
                res.json({
                    status: false,
                    data: "Invalid Data. Error while fetching task for normal user."
                })
            })
        }
        else{
            console.log("No Data found for loggedin user data.");
            res.json({
                status: false,
                data: "No Data Found. For Loggedin user."
            })
        }
    }).catch(err=>{
        console.log("Error while getting user data for email", err);
        res.json({
            status: false,
            data: "Invalid Data. Got Error while fetching user data for loggedin user"
        })
    })
};

module.exports = GetTasks;