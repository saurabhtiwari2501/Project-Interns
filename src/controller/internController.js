const CollegeModels = require('../model/collegeModel')
const InternMOdels = require('../model/internModel')

const createIntern = async function (req, res) {
    try {
        if (req.body && Object.keys(req.body).length > 0) {
            
            let college = await CollegeModels.find({ name: req.body.collegeName, isDeleted: false })
            if (!college) {
                res.status(400).send({ status: false, msg: "Request must be contain a valid" })
            } else {
                let interdata = {
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    collegeId: college._id
                }
                let intern = await InternMOdels.create(interdata)
                res.status(201).send({ status: true, data: intern })
            }

        } else {
            res.status(400).send({ status: false, msg: "request must be contain a body" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.massage })
    }
}



module.exports.createIntern = createIntern

