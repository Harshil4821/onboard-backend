const Logout = (req, res)=>{
    res.clearCookie("ob_h_a", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        // domain: "localhost"
    })
    res.json({
        status: true,
        data: "Loggedout successfully."
    })
};

module.exports = Logout;