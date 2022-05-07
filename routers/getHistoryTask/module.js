const Tasks = require("../../Schema/tasks");
const UserModel = require("../../Schema/user_detail");

const GetHistoryTasks = async (req, res)=>{
    const { user_email } = req;
    
    const userData = await UserModel.findOne({email: user_email});
    console.log("Pritnign user data", userData);

    if(userData !== null && userData?.admin === true){
        const companyId = userData?.company_id;
        console.log("Pritnign company id", companyId);
        const historyTasks = await Tasks.find({company_id: companyId, status: "Completed"});
        console.log("printing history task", historyTasks);

        if(historyTasks !== null){
            res.send({
                status: true,
                data: historyTasks
            })
        }
        else{
            res.send({
                status: true,
                data: []
            })
        }
    }
    else{
        res.send({
            status: false,
            error: "Something went wrong, Please try again later.!"
        })
    }
};

module.exports = GetHistoryTasks;