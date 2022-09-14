const mongoose=require('mongoose')
const isValidMobileNumber=function(number){
    return /^[6-9]\d{9}$/.test(number)
}

const isNameLower=function(name){
    return /^([a-z-]+)$/.test(name)
} 

const isValidLink=function(link){
    return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(link)
}
const isValidSpace = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidName = function (value) {
    let regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
    return regex.test(value)
}

const isValidfullName = function (value) {
    return /^([a-zA-Z,\s]+)$/.test(value)
}     


const isvalidRequest=function(body){
    return Object.keys(body).length > 0
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const isValidEmail=function(email){
    return /^\S+@\S+\.\S+$/.test(email)
}
module.exports.isValidMobileNumber=isValidMobileNumber
module.exports.isNameLower=isNameLower
module.exports.isValidSpace=isValidSpace
module.exports.isValidName=isValidName
module.exports.isValidLink=isValidLink
module.exports.isvalidRequest=isvalidRequest
module.exports.isValidObjectId=isValidObjectId
module.exports.isValidEmail=isValidEmail
module.exports.isValidfullName=isValidfullName