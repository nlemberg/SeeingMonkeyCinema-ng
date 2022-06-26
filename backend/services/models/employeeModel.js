const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add last name"],
    },
    username: {
      type: String,
      required: [true, "Please add username"],
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    permissions: {
      type: Object,
      required: [true, "Please add permission(s)"],
    },
    // createdAt: { type: Date, immutable: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("employee", employeeSchema);
