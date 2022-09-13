const collegeModel=require('../model/collegeModel')

const createCollege=async function(req,res){
    let collegeData=await collegeModel.create(req.body)
    res.status(201).send({status:true,msg:'College Data Created Successfully',collegeData})
}

module.exports.createCollege=createCollege

//hey priyanka
//hello world