const User = require("../../Schema/user_detail");
const Task = require("../../Schema/tasks");

const EditTask = (req, res)=>{
    const loggedin_user_email = req.user_email;
    const {title, description, assigned, status, task_id, attachment, dueDate, checkList} = req.body;

    if(!title || !assigned || !status){
        res.json({
            status: false,
            data: "Please fill all required fields."
        });
    }
    else{
        User.findOne({email: loggedin_user_email}).then(data=>{
            if(data.admin === true){
                Task.findOneAndUpdate({task_id: task_id}, {
                    title: title,
                    description: description === undefined ? "" : description,
                    assigned: assigned,
                    status: status,
                    attachment: attachment,
                    dueDate: dueDate,
                    checkList, checkList
                }).then(data=>{
                    console.log("Printing updated data", data);
                    if(data !== null){
                        res.json({
                            status: true,
                            data: "Task updated successfully."
                        });
                    }
                    else{
                        res.json({
                            status: false,
                            data: "No Data Found. Got Error while updating data for given task in Admin user."
                        })
                    }
                }).catch(err=>{
                    console.log("Got Error while updating task for admin user. Syntax Error. Invalid Data.",err);
                    res.json({
                        status: false,
                        data: "Invalid Data. Got Error while updating task for Admin user."
                    })
                })
            }
            else{
                Task.find({$and: [{assigned: loggedin_user_email},{task_id: task_id}]}).then(data=>{
                    console.log("Printing normal user edit task finding data", data);
                    Task.findOneAndUpdate({task_id: task_id}, {
                        title: title,
                        description: description === undefined ? "" : description,
                        assigned: assigned,
                        status: status,
                        attachment: attachment,
                        dueDate: dueDate,
                        checkList, checkList
                    }).then(data=>{
                        console.log("Printing updated data for normal user", data);
                        if(data !== null){
                            res.json({
                                status: true,
                                data: "Task updated successfully."
                            });
                        }
                        else{
                            res.json({
                                status: false,
                                data: "No Data Found. Got Error while updating data for given task in Normal user."
                            })
                        }
                    }).catch(err=>{
                        console.log("Got error while updating task for normal user.",err);
                        res.json({
                            status: false,
                            data: "Invalid Data."
                        })
                    })
                })
            }
        })
    }
};

module.exports = EditTask;