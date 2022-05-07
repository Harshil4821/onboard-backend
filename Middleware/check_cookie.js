const Tokens = require("../Schema/token");

const CheckCookie = async (req, res, next)=>{
    console.log("Printing request from CheckCookie");
    console.log(req.headers);
    if(req.headers?.cookie === undefined){
        res.json({
            status: false,
            data: "User is not loggedin. Please login."
        })
    }
    else{
        let cookie = req.headers?.cookie?.includes("ob_h_a=");
        let token;
        if(cookie){
            if(req.headers.cookie.includes("ob_h_a=''")){
                res.json({
                    status: false,
                    data: "User is not loggedin. Please login."
                })
            }
            token = req.headers.cookie.split("ob_h_a=")[1];
            console.log("Printing Token",req.headers.cookie.split("ob_h_a=")[1]);
            let data = await Tokens.find({token: token});
            console.log("Printing data comes from Tokens", data);
    
            if(data !== null && data.length === 1){
                console.log("Token matched")
                req.user_email = data[0].email;
                next();
            }
            else{
                res.json({
                    status: false,
                    data: "Invalid Data."
                })
            }
        }
        else{
            res.json({
                status: false,
                data: "User is not loggedin. Please login."
            })
        }
    }
}

module.exports = CheckCookie;