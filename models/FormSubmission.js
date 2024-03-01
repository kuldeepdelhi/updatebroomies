
const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
});

const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema);

module.exports = FormSubmission;
