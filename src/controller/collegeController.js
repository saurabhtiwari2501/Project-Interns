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
}

const collegeDetails = async function (req, res) {
    try {
        let query = req.query
        let { collegeName } = query
        if (!v.isvalidRequest(collegeName)) return res.status(400).send({ status: false, msg: 'collegeName query is required' })
        
        let collegeData = await collegeModel.findOne({ name: collegeName })
        if(!collegeData) return res.status(400).send({ status: false, msg: 'collegeName not exist' })
        
        let internData = await internModel.find({ collegeId: collegeData._id })
        let Data = { name: collegeData.name, fullName: collegeData.fullName, logolink: collegeData.logoLink, interns: internData }
        res.status(200).send({ Data: Data })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.msg })
    }
}
module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails
