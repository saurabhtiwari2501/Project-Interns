const internModel = require('../model/internModel')
const v=require('../validation/validation')

const createIntern = async function (req, res) {
    try {
        let {mobile} = req.body
        if(!v.isValidMobileNumber(mobile)) return res.status(400).send({status:false,msg:'Enter Valid Mobile Number'})
        let internData = await internModel.create(req.body)
        res.status(201).send({ status: true, msg: "Intern Data Created Successfully", internData })
    }
    catch (error) { 
        res.status(500).send({ status: false, msg: error.msg }) 
    }
}

module.exports.createIntern=createIntern