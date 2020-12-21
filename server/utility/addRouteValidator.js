const {check, validationResult, body} = require ('express-validator')

exports.inputValidatoinResult=(req, res, next)=>{
    const result= validationResult(req)
    if(!result.isEmpty()){
        res.status(422).send(result)
        return
    }
    next()
}

exports.validateInputs= [
    check('question')
        .trim()
        .notEmpty().withMessage('question is required'),
    check('answer1')
        .trim()
        .notEmpty().withMessage('answer option 1 is required'),
    check('answer2')
        .trim()
        .notEmpty().withMessage('answer option 2 is required'),
    check('answer3')
        .trim()
        .not()
        .isEmpty().withMessage('answer option 3 is requied'),
    check('answer4')
        .trim()
        .notEmpty().withMessage('answer option 4 is required'),
    check('correct')
        .trim()
        .notEmpty().withMessage('a correct answer must be identified')
        .custom((value, {req})=>{
            if(![req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4].includes(value)){
                throw new Error ('correct answer doenst match')
            }else{
                return value
            }
        })
]