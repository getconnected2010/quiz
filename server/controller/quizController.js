const db= require('../config/db')

exports.GetQa = (req, res)=>{
    console.log('db hit')
    const listSql= "SELECT * FROM quiz_list ORDER BY id DESC";
    db.query(listSql, (err, results)=>{
        if(err) return res.status(400).json(err)
        res.status(200).json(results)
    })
}

exports.AddQa = (req, res)=>{
    const {question, answer1, answer2, answer3, answer4, correct} = req.body
    const sqlAdd = "INSERT INTO quiz_list (question, answer1, answer2, answer3, answer4, correct) VALUES (?,?,?,?,?,?)";
    db.query(sqlAdd, [question, answer1, answer2, answer3, answer4, correct], (err, result)=>{
        if(err) return res.status(400).json(err)
        res.status(200).send(result)
    })
}

exports.deleteQa=(req, res)=>{
    const id= req.params.id
    const deleteSql= "DELETE FROM quiz_list WHERE id=?"
    db.query(deleteSql, [id], (err, result)=>{
        if(err) return res.status(400).json(err)
        res.status(200).send(result)
    })
}