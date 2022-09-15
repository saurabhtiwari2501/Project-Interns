const internModel = require('../model/internModel')
const collegeModel = require('../model/collegeModel')
const v=require('../validation/validation')

const createIntern = async function (req, res) {
    try {
        let requestBody=req.body
        if(!v.isvalidRequest(requestBody)) return res.status(400).send({status:false,msg:'body data is required'})
        if(v.isvalidRequest(req.query)) return res.status(400).send({ status: false, msg: 'Query Data Not Needed' })

        let {name,email,mobile,collegeName,isDeleted} = requestBody

        if(!v.isValidSpace(name)) return res.status(400).send({status:false,msg:'name is required'})
        if(!v.isValidName(name)) return res.status(400).send({status:false,msg:'name is required in valid format'})
        
        if(!v.isValidSpace(email)) return res.status(400).send({status:false,msg:'email is required'})
        if(!v.isValidEmail(email)) return res.status(400).send({status:false,msg:'email is required in valid format'})
        
        let checkDuplicateEmail=await internModel.findOne({email:email}) 
        if(checkDuplicateEmail) return res.status(400).send({status:false,msg:'Please Enter Another Data-email already exist'})
        
        if(!v.isValidSpace(mobile)) return res.status(400).send({status:false,msg:'mobile is required'})
        if(!v.isValidMobileNumber(mobile)) return res.status(400).send({status:false,msg:'enter 10 diggiit valid mobile number with +91'})
        
        let checkDuplicateMobile=await internModel.findOne({mobile:mobile}) 
        if(checkDuplicateMobile) return res.status(400).send({status:false,msg:'Please Enter Another Data-mobile already exist'})
        
        if(!v.isValidSpace(collegeName)) return res.status(400).send({status:false,msg:'collegeId is required'})
        if (!v.isNameLower(collegeName)) return res.status(400).send({ status: false, msg: 'collegeName lower case or - allowed only' })

        let Data=await collegeModel.findOne({name:collegeName})
        if(!Data) return res.status(400).send({status:false,msg:'Enter Valid collegeName'})
        let collegeId=Data._id
        let DataBlock={name,email,mobile,collegeId}
        if (isDeleted) return res.status(400).send({ status: false, msg: 'Data Creation Failed' })
        let internData = await internModel.create(DataBlock)
        res.status(201).send({ status: true, msg: "Intern Data Created Successfully", internData })
    }
    catch (error) { 
        console.log(error)
        res.status(500).send({ status: false, msg: error.msg }) 
    }
}

module.exports.createIntern=createIntern