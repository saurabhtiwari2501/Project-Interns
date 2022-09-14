const isValidMobileNumber=function(number){
    // return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(number)
    return /^[+][9][1][6-9]\d{9}$/.test(number)
}

const isNameUpper=function(name){
    return /^[A-Z])([A-Z\s]+)$/.test(name)
} //returns only upper without space

const isValidSpace = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidName = function (value) {
    let regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
    return regex.test(value)
}

module.exports.isValidMobileNumber=isValidMobileNumber
module.exports.isNameUpper=isNameUpper
module.exports.isValidSpace=isValidSpace
module.exports.isValidName=isValidName