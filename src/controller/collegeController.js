const collegeModel = require('../model/collegeModel')
const internModel = require('../model/internModel')
const createCollege = async function (req, res) {
    try {
        let collegeData = await collegeModel.create(req.body)
        res.status(201).send({ status: true, msg: 'College Data Created Successfully', collegeData })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.msg })
    }
}

const collegeDetails = async function (req, res) {
    try {
        let { collegeName } = req.query

        let collegeData = await collegeModel.findOne({ name: collegeName })

        let internData = await internModel.find({ collegeId: collegeData._id })

        let Data = { name: collegeData.name, fullName: collegeData.fullName, logolink: collegeData.logoLink, interns: internData }
        res.status(200).send({ status: true, msg: "Data Found", Data: Data })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.msg })
    }
}
module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails
