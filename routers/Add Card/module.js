const User = require("../../Schema/user_detail");
const Tasks = require("../../Schema/tasks");
const UpdateCounter = require("../Update Counter/module");
const Counter = require("../../Schema/counter");

const AddCard = (req, res)=>{
    const loggedin_user_email = req.user_email;
    const {title, assigned, status, checkList, dueDate, attachment} = req.body;

    if(!title || !assigned || !status){
        res.json({
            status: false,
            data: "Please Enter all required fields."
        })
    }
    else{
        User.findOne({email: loggedin_user_email}).then(async (userDetail)=>{
            console.log("Printing userDetail from Add Card", userDetail);
            console.log(userDetail.admin);
            console.log(userDetail.is_admin == true);
                Tasks.find({title: title}).then(async (data)=>{
                    if(data.length > 0){
                        res.json({
                            status: false,
                            data: "Please provide a different title for this task."
                        })
                    }
                    else{
                        UpdateCounter();
                        const task_id = await Counter.find({name: "Task Counter"});
                        console.log("Printing task_id", task_id);
                        Tasks.insertMany([{
                            company_id: userDetail?.company_id,
                            task_id: task_id[0].value,
                            title: title,
                            description: req.body?.description ? req.body.description : "",
                            assigned: assigned,
                            status: status,
                            attachment: attachment, 
                            dueDate: dueDate,
                            checkList: checkList
                        }]).then((data)=>{
                            console.log("Printing data after insertion.", data);
                            res.json({
                                status: true,
                                data: "Task assigned successfully."
                            })
                        }).catch((err)=>{
                            console.log("Error while adding task.", err);
                            res.json({
                                status: false,
                                data: "Invalid Data. Got Error while inserting Task."
                            })
                        })
                    }
                })
        })
    }
};

module.exports = AddCard;