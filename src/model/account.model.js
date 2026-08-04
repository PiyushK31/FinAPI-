const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [ true, "Account must be associated with a user"],
        index: true
    },
    status: {
        type: String,
        enum: ["ACTIVE", "FROZEN", "CLOSED"],
        default: "ACTIVE",
        required: [true, "Status is required"]
    },
    currency: {
        type: String,
        required: [ true, "Currency is required"],
        default: "INR"
    }
}, {
    timestamps: true
})

accountSchema.index({ user: 1, status: 1 }, { unique: true });


const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;
