const jwt=require('jsonwebtoken')

exports.assignCookies = (req, res)=>{
    try {
        const user_id= req.body.user_id
        const admin = req.body.admin
        const accessToken= jwt.sign({user_id, admin}, process.env.JWT_ACCESS_TOKEN)
        const refreshToken= jwt.sign({user_id, admin}, process.env.JWT_REFRESH_TOKEN)
        const user= jwt.sign({user_id, admin}, process.env.JWT_USER_SET_TOKEN)
        res.cookie('accessToken', accessToken,{
            maxAge: 30000,
            httpOnly: true,
            secure: false
        })
        res.cookie('refreshToken', refreshToken, {
            maxAge: 60000,
            httpOnly: true,
            secure: false
        })
        res.cookie('user', user, {
            maxAge: 60000,
            httpOnly: false,
            secure: false
        })
        res.status(200).json({msg:'Welcome'})
    } catch (error) {
        res.status(400).json({msg: 'custom server error cookies'})
    }
}