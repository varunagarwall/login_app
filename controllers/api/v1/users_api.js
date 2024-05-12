const User= require('../../../models/user');
const jwt= require('jsonwebtoken');

module.exports.createSession = async function (req, res) {
try {
    let user =await User.findOne({email: req.body.email});

    if(!user || user.password != req.body.password){
        return res.json(200, {
            message: "Invalid Email or Password"

    })
    

}
return res.status(200).json({
    message: "Signed In Successfully",
    data :{
        token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'})
    }
})
}
 catch (err) {
    console.log('******',err);
    return res.status(500).json({
        message: "Internal Server Error"
    });
}

}