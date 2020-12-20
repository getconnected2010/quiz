const {check, validationResult} = require ('express-validator')

exports.qaCheckResult=(req, res, next)=>{
    const result= validationResult(req)
    if(!result.isEmpty){
        res.status(422).send(result)
    }
    next()
}

exports.qaBodyCheck= [
    check('question')
        .trim()
        .not()
        .isEmpty()
        .withMessage('question is required'),
    check('answer1')
        .trim()
        .not()
        .isEmpty()
        .withMessage('answer option 1 is required'),
    check('answer2')
        .trim()
        .not()
        .isEmpty()
        .withMessage('answer option 2 is required'),
    check('answer3')
        .trim()
        .not()
        .isEmpty()
        .withMessage('answer option 3 is requied'),
    check('answer4')
        .trim()
        .not()
        .isEmpty()
        .withMessage('answer option 4 is required'),
    check('correct')
        .trim()
        .not()
        .isEmpty()
        .withMessage('a correct answer must be identified')
]