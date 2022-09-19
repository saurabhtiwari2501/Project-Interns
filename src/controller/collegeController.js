const collegeModel = require('../model/collegeModel')
const internModel = require('../model/internModel')
const v = require('../validation/validation')

const createCollege = async function (req, res) {
    try {
        let requestBody = req.body
        if (!v.isvalidRequest(requestBody)) return res.status(400).send({ status: false, msg: 'Enter Some Data In Body' })
        
        if(v.isvalidRequest(req.query)) return res.status(400).send({ status: false, msg: 'Query Data Not Needed' })

        let { name, fullName, logoLink, isDeleted } = requestBody
        
        if (!v.isValidSpace(name)) return res.status(400).send({ status: false, msg: 'name is required' })
        if (!v.isNameLower(name)) return res.status(400).send({ status: false, msg: 'name lower case or - allowed only' })

        if (await collegeModel.findOne({ name: name })) return res.status(400).send({ status: false, msg: 'Please Enter Another Data-name already exist' })

        if (!v.isValidSpace(fullName)) return res.status(400).send({ status: false, msg: 'FullName is required' })
        if (!v.isValidfullName(fullName)) return res.status(400).send({ status: false, msg: 'FullName Allowed Only In Alphabetic Form' })
        if (!v.isValidSpace(logoLink)) return res.status(400).send({ status: false, msg: 'logolink is required' })
        if (!v.isValidLink(logoLink)) return res.status(400).send({ status: false, msg: 'logolink is required in valid format' })
            
        if (isDeleted) return res.status(400).send({ status: false, msg: 'Data Creation Failed' })
        let collegeData = await collegeModel.create(requestBody)
        res.status(201).send({ status: true, data: 'College Data Created Successfully', collegeData })
    }

    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.msg })
    }
};

let collegeDetails = async function(req,res){
    try{
        if(req.query.collegeName){
            let college = await collegeModel.find({name:req.query.collegeName,isDeleted:false})
            if(!college){
                res.status(404).send({status:false,msg:"college not found in query"})
            }else{
                let collegeData = {
                    name: college.name,
                    fullName:college.fullName,
                    logoLink: college.logoLink
                }
                let intern = await internModel.find({collegeId:college._id, isDeleted:false},'-collegeId -isDeleted -createdAt-updatedAt').sort({createdAt:-1})
                if(intern){
                   collegeData.intern = intern
                }
                res.status(201).send({status:true,data:collegeData})
            }
        }else{
            res.status(400).send({status:false,msg:"collegeName must be present in query"})

        }
    }catch(error){
        res.status(500).send({status:false,msg:error.massage})
    }
}
module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails
