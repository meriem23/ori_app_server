const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
    {
        categories: [
            {
                name: {
                    type: String,
                    required: true,
                },
                recipe: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "recipe",
                    required: true,
                },

            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("category", CategorySchema);
