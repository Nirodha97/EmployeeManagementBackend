const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const EmployeeSchema = mongoose.Schema({
    
    _id: Number,
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emailId: {type: String, required: true,  validate: [validateEmail, 'Please fill a valid email address']}

},
{ _id: false }, {
    timestamps: true
});
EmployeeSchema.plugin(AutoIncrement);


module.exports = mongoose.model('Employee', EmployeeSchema);