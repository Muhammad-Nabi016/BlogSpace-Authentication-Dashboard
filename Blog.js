
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            required: true,
            trim: true,
            minlength: 20
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft"
        },
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: false
            }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

module.exports = mongoose.model("Blog", blogSchema);
