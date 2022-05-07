const bcrypt = require("bcrypt");
const User = require("../../Schema/user_detail");
const Token = require("../../Schema/token");
const jwt = require("jsonwebtoken");

const Login = (req, res)=>{
    const {email, password} = req.body;
    const date = new Date();

    if(!email || !password){
        res.json({
            status: false,
            data: "Please fill all required fields."
        })
    }
    else{
        User.findOne({email: email}).then(async (data)=>{
            if(data !== null){
                const check_password = await bcrypt.compare(password, data.password);
                if(check_password){
                    console.log("Printing _id from data", data._id);
                    const token = await jwt.sign({_id: data._id}, "HARSHILHARESHBHAICHUDASAMA1357924680");
                    console.log("Printing token", token);
                    Token.insertMany([{
                        email, token, date: `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                    }]).then(data1=>{
                        console.log("Printing data for then.", data1);
                        if(data?.length>0 || data !== null){
                            res.cookie("ob_h_a", token , {
                                expires: new Date(Date.now() + (30*24*60*60*1000)),
                                // httpOnly: true,
                                // secure: true,
                                // sameSite: 'none',
                                path: "/",
                                // domain: "shielded-lowlands-66092.herokuapp.com"
                            })
                            res.json({
                                status: true,
                                data: "User Loggedin successfully."
                            })
                        }
                        else{
                            res.json({
                                status: false,
                                data: "Array length is 0. Empty array returned."
                            })
                        }
                    }).catch(err=>{
                        console.log("Printing error in catch",err);
                        res.json({
                            status: false,
                            data: "Invalid Data. Error while inserting data in tokens."
                        })
                    })
                }
                else{
                    res.json({
                        status: false,
                        data: "Invalid Credentials."
                    })
                }
            }
            else{
                res.json({
                    status: false,
                    data: "Invalid Credentials."
                })
            }
        }).catch(err=>{
            console.log("Printing error while fetching user for loggedin email.",err);
            res.json({
                status: false,
                data: "Invalid Data."
            })
        })
    }
}

module.exports = Login;