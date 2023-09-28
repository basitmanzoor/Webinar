const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const webinarSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A webinar must have a name"],
      unique: false,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
      required: [true, "A webinar must have a video"],
      trim: true,
      unique: false,
    },
    description: {
      type: String,
      required: [true, "A webinar must have a description"],
    },
    startTime: {
      type: Date,
      required: [true, "A webinar must have a start date"],
    },
    endTime: {
      type: Date,
      required: [true, "A webinar must have a start date"],
    },
    registeredUsers: [
      {
        name: {
          type: String,
        },
        email: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

//Register for Webinar

const Webinar = mongoose.model("webinar", webinarSchema);

module.exports = Webinar;
