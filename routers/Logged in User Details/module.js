const User = require("../../Schema/user_detail");

const UserMe = async (req, res)=>{
    const email = req?.user_email;
    console.log("Printing email in user/me", email);

    const fetchUserData = await User.find({email: email});
    console.log("Printing fetched user data",fetchUserData);

    if(fetchUserData !== null || fetchUserData.length === 0){
        res.json({
            status: true,
            data: fetchUserData});
    }
    else{
        res.json({
            status: false,
            data: "No Data Found."
        })
    }
};

module.exports = UserMe;