const {check, validationResult, body} = require ('express-validator')

exports.validatorResult = (req, res, next)=>{
    const result= validationResult(req)
    if(!result.isEmpty()){
        if(result.errors[0].msg) return res.status(422).json({msg: result.errors[0].msg})
        res.status(422).json({msg: 'server detected an invalid input'})
        return
    }
    next()
}

exports.addQA= [
    check('subject')
        .escape()
        .trim()
        .notEmpty().withMessage('a subject area is required')
        .isLength({max:45}).withMessage('maximun of 45 characters allowed for subject'),
    check('question')
        .escape()
        .trim()
        .notEmpty().withMessage('question is required')
        .isLength({max: 45}).withMessage('maximum of 45 characters allowed for question'),
    check('answer1')
        .escape()
        .trim()
        .notEmpty().withMessage('answer option #1 is required')
        .isLength({max: 45}).withMessage('maximum of 45 characters allowed for answer option #1'),
    check('answer2')
        .escape()
        .trim()
        .notEmpty().withMessage('answer option #2 is required')
        .isLength({max: 45}).withMessage('maximum of 45 characters allowed for answer option #2'),
    check('answer3')
        .escape()
        .trim()
        .notEmpty().withMessage('answer option #3 is requied')
        .isLength({max: 45}).withMessage('maximum of 45 characters allowed for answer option #3'),
    check('answer4')
        .escape()
        .trim()
        .notEmpty().withMessage('answer option #4 is required')
        .isLength({max: 45}).withMessage('maximum of 45 characters allowed for answer option #4'),
    check('correct')
        .escape()
        .trim()
        .notEmpty().withMessage('a correct answer must be identified')
        .isLength({max: 45}).withMessage('maximum of 45 characters allowed as a correct answer')
        .custom((value, {req})=>{
            if(![req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4].includes(value)){
                throw new Error ("correct answer value doesn't match any of the answer options")
            }else{
                return value
            }
        })
]

exports.delUser =[
    check('delUsername')
        .escape()
        .trim()
        .notEmpty().withMessage('value is required for a username to be deleted')
        .isLength({max:45}).withMessage('maximum of 45 characters allowed as a username')
]

exports.dnGradeUser=[
    check('dnUsername')
        .escape()
        .trim()
        .notEmpty().withMessage('value is required for a username to be down-graded')
        .isLength({max:45}).withMessage('maximum of 45 characters allowed as a username')
]

exports.recordScore =[
    check('subject')
        .escape()
        .trim()
        .notEmpty().withMessage('a value is required for subject')
        .isLength({max:45}).withMessage('maximum of 45 characters allowed for subject field')
        .custom((value)=>{
            if(!['History', 'Geography', 'General', 'Science'].includes(value)){
                throw new Error('invalid subject field')
            }else{
                return value
            }
        })
]

exports.upgradeUser =[
    check('upUsername')
        .escape()
        .trim()
        .notEmpty().withMessage('value is required for a username to be upgraded')
        .isLength({max:45}).withMessage('maximum of 45 characters allowed as a username')
]

exports.userAdminReset = [
    check('unflagUser')
        .escape()
        .trim()
        .notEmpty().withMessage('value is required for a username to be reset')
        .isLength({max:45}).withMessage('maximum of 45 characters allowed as a username')
]

exports.userSelfReset =[
    check('username')
        .escape()
        .trim()
        .notEmpty().withMessage('username is required')
        .isLength({max:45}).withMessage('maximum of 45 characters allowed as a username'),
    check('password')
        .escape()
        .trim()
        .notEmpty().withMessage('password is required')
        .isLength({min:6, max:12}).withMessage('password must be 6 to 12 characters long')
]