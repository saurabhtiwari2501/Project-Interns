const internModel = require('../model/internModel')
const v=require('../validation/validation')

const createIntern = async function (req, res) {
    try {
        let requestBody=req.body
        if(!v.isvalidRequest(requestBody)) return res.status(400).send({status:false,msg:'body data is required'})
        let {name,email,mobile,collegeId} = requestBody
        if(!v.isValidSpace(name)) return res.status(400).send({status:false,msg:'name is required'})
        if(!v.isValidName(name)) return res.status(400).send({status:false,msg:'name is required in valid format'})
        if(!v.isValidSpace(email)) return res.status(400).send({status:false,msg:'email is required'})
        if(!v.isValidEmail(email)) return res.status(400).send({status:false,msg:'email is required in valid format'})
        let checkDuplicateEmail=await internModel.findOne({email:email}) 
        if(checkDuplicateEmail) return res.status(400).send({status:false,msg:'Please Enter Another Data-email already exist'})
        
        if(!v.isValidSpace(mobile)) return res.status(400).send({status:false,msg:'mobile is required'})
        if(!v.isValidMobileNumber(mobile)) return res.status(400).send({status:false,msg:'enter 10 digit valid mobile number with +91'})
        let checkDuplicateMobile=await internModel.findOne({mobile:mobile}) 
        if(checkDuplicateMobile) return res.status(400).send({status:false,msg:'Please Enter Another Data-mobile already exist'})
        
        if(!v.isValidSpace(collegeId)) return res.status(400).send({status:false,msg:'collegeId is required'})
        if(!v.isValidObjectId(collegeId)) return res.status(400).send({status:false,msg:'collegeId is required in valid format'})
        // let checkcollegeId=await internModel.findOne({collegeId:collegeId}) 
        // if(checkcollegeId) return res.status(400).send({status:false,msg:'Please Enter Another Data-mobile already exist'})
        
        let internData = await internModel.create(req.body)
        res.status(201).send({ status: true, msg: "Intern Data Created Successfully", internData })
    }
    catch (error) { 
        console.log(error)
        res.status(500).send({ status: false, msg: error.msg }) 
    }
}

module.exports.createIntern=createIntern