const jwt=require('jsonwebtoken')

exports.assignCookies = (req, res)=>{
    try {
        const user_id= req.body.user_id
        const admin = req.body.admin
        const accessToken= jwt.sign({user_id, admin}, process.env.JWT_ACCESS_TOKEN)
        const refreshToken= jwt.sign({user_id, admin}, process.env.JWT_REFRESH_TOKEN)
        const user= jwt.sign({user_id, admin}, process.env.JWT_USER_SET_TOKEN)
        res.cookie('accessToken', accessToken,{
            maxAge: 1000*60*30,
            httpOnly: true,
            secure: false
        })
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000*60*45,
            httpOnly: true,
            secure: false
        })
        res.cookie('user', user, {
            maxAge: 1000*60*30,
            httpOnly: false,
            secure: false
        })
        res.status(200).json({msg:'Welcome'})
    } catch (error) {
        res.status(400).json({msg: 'custom server error cookies'})
    }
}

exports.deleteCookies=(req, res)=>{
    try {
        res.cookie('accessToken', '', {
            maxAge: 0
        })
        res.cookie('refreshToken', '', {
            maxAge: 0
        })
        res.cookie('user', '',{
            maxAge: 0
        })
        res.status(200).json({msg:'successfully logged out'})
    } catch (error) {
        res.status(500).json({msg:'server error logging you out'})
    }
}

//verifies 'refresh' & 'user' tokens. 
//Then compares user_id in tokens match in req body
//Then verifies admin value in tokens
exports.verifyAdminCookies=(req, res, next)=>{
    try {
        const refreshToken= req.cookies.refreshToken
        const userToken = req.cookies.user
        const refreshPayload= jwt.decode(refreshToken)
        const userPayload= jwt.decode(userToken)
        if(refreshToken && userToken 
            && 
            jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN) 
            && 
            jwt.verify(userToken, process.env.JWT_USER_SET_TOKEN) 
            && 
            userPayload.user_id===Number(req.params.user_id||req.body.user_id)
            && 
            refreshPayload.user_id===Number(req.params.user_id||req.body.user_id)
            &&
            refreshPayload.admin==='true' && userPayload.admin==='true'
            ){
                next()
        }else{
            res.status(401).json({msg: "you don't have admin priviledge"})
        }
    } catch (error) {
        res.status(500).json({msg:'server error checking cookies'})
    }
}

exports.verifyLoggedUserCookies=(req, res, next)=>{
    try {
        const refreshToken= req.cookies.refreshToken
        const userToken = req.cookies.user
        const refreshPayload= jwt.decode(refreshToken)
        const userPayload= jwt.decode(userToken)
        if(refreshToken && userToken 
            && 
            jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN) 
            && 
            jwt.verify(userToken, process.env.JWT_USER_SET_TOKEN) 
            && 
            userPayload.user_id===Number(req.params.user_id||req.body.user_id)
            && 
            refreshPayload.user_id===Number(req.params.user_id||req.body.user_id)){
                next()
            }else{
                res.status(401).json({msg:"You are not a logged in user."})
            }
    } catch (error) {
        res.status(401).json({msg:"You are not a logged in user"})
    }

}