const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    addedBy: { // учитель, который добавил
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Student", studentSchema);
