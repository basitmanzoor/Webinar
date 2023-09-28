const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have an email address"],
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 8,
    select: false,
  },
  passwordConfirmation: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //This only works on create and save
      validator: function (el) {
        return el === this.password;
      },
      message: "Paswords are not same",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  registeredWebinars: [
    {
      type: Schema.Types.ObjectId,
      ref: "webinar",
    },
  ],
  attendedWebinars: [
    {
      type: Schema.Types.ObjectId,
      ref: "webinar",
    },
  ],
  // passwordChangedAt: Date,
  // passwordResetToken: String,
  // passwordResetExpires: Date,
  isActive: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function (next) {
  // only run if password was modified
  if (!this.isModified("password")) return next();

  //hash the password, hashing algorithm: bcryptjs with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete the password confirm field
  this.passwordConfirmation = undefined;
  next();
});

//instance method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  //false mean not changed
  return false;
};

//instance method for forgot password
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordRestToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordRestToken);

  this.passwordRestExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
