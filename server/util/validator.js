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

exports.dob=[
    check('dob')
        .trim()
        .notEmpty().withMessage('birth month and date as MMDD format required')
        .isLength({min:4, max:4}).withMessage('birth month and date as MMDD format required')
        .isInt().withMessage('only numbers allowed as date of birth as MMDD')
]

exports.newPassword=[
    check('newPassword')
        .trim()
        .notEmpty().withMessage('new password is required')
        .isLength({min:4, max:12}).withMessage('new password must be 4 to 12 characters long')
]

exports.newUsername=[
    check('newUsername')
        .escape()
        .trim()
        .notEmpty().withMessage('new username required')
        .isLength({min:4, max: 40}).withMessage('new username must be 4 to 40 characters long')
]

exports.password =[
    check('password')
        .trim()
        .notEmpty().withMessage('password is required')
        .isLength({min: 4, max: 12}).withMessage('password must be 4 to 12 characters long')
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

exports.username=[
    check('username')
        .escape()
        .trim()
        .notEmpty().withMessage('a username value is required')
        .isLength({min:4, max:40}).withMessage('username must be 4 to 40 characters long')
]
