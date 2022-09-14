const internModel = require('../model/internModel')

const createIntern = async function (req, res) {
    try {
        let internData = await internModel.create(req.body)
        res.status(201).send({ status: true, msg: "Intern Data Created Successfully", internData })
    }
    catch (err) { 
        res.status(500).send({ status: false, msg: err.msg }) 
    }
}

module.exports.createIntern=createIntern