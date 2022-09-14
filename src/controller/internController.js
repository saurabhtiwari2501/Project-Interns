const internModel = require('../model/internModel')

//validation function are here
const isValidMobileNumber=function(number){
    return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(number)
}

const createIntern = async function (req, res) {
    try {
        let internData = await internModel.create(req.body)
        if(!isValidMobileNumber(mobile)) return res.status(400).send({status:false,msg:'Enter Valid Mobile Number'})
        res.status(201).send({ status: true, msg: "Intern Data Created Successfully", internData })
    }
    catch (err) { 
        res.status(500).send({ status: false, msg: err.msg }) 
    }
}

module.exports.createIntern=createIntern