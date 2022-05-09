const GetQuoteModel = require("../../Schema/quote");

const GetQuote = async (req, res) => {
    const { body } = req;
    console.log("Pritning body for the get quote", body);

    const { name, email, message } = body;

    if(name !== "" && email !== ""){
        const response = await GetQuoteModel.insertMany([{
            name: name,
            email: email,
            message: message
        }]);

        if(response !== null){
            res.send({
                status: true,
                message: "Quote saved successfully."
            })
        }
        else{
            res.send({
                status: false,
                message: "Something went wrong, Please try again later.!"
            })
        }
    }
    else{
        res.send({
            status: false,
            message: "Please fill all required fields."
        })
    }
};

module.exports = GetQuote;