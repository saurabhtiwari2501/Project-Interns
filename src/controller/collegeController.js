const collegeModel=require('../model/collegeModel')

const createCollege=async function(req,res){
    let collegeData=await collegeModel.create(req.body)
    res.status(201).send({status:true,msg:'College Data Created Successfully',collegeData})
}

const collegeDetails=async function(req,res){
    let collegeName=req.query.collegeName
    //let collegeData=await collegeModel.findOne(collegeName)
    let internData=await collegeModel.find().populate('collegeId')
    res.send(internData)
    
}
module.exports.createCollege=createCollege
