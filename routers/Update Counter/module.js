const Counter = require("../../Schema/counter");

const UpdateCounter = ()=>{
    Counter.findOneAndUpdate({name: "Task Counter"}, {
        $inc: {
            value: 1
        }
    }).then(data=>{
        console.log("updated counter", data);
    }).catch(err=>{
        console.log("Got Error while updating data", err);
    })
};

module.exports = UpdateCounter;