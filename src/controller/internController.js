const internModel = require('../model/internModel')

//validation function are here
const isValidMobileNumber=function(number){
    return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(number)
}

const createIntern = async function (req, res) {
    try {
        let {mobile} = req.body
        if(!isValidMobileNumber(mobile)) return res.status(400).send({status:false,msg:'Enter Valid Mobile Number'})
        let internData = await internModel.create(req.body)
        res.status(201).send({ status: true, msg: "Intern Data Created Successfully", internData })
    }
    catch (error) { 
        res.status(500).send({ status: false, msg: error.msg }) 
    }
}

module.exports.createIntern=createIntern