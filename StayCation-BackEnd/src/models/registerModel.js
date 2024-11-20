const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
          // This custom validator checks that confirmPassword is the same as passwword
          validator: function(value) {
            return this.password === value;
          },
          message: "Passwords don't match."
        }
    }
},
{
    timestamps: true
});

registerSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isModified('confirmPassword')) {
        if (this.password !== this.confirmPassword) {
            throw new Error("Passwords don't match");
        }
    }
    next();
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;