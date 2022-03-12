const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Category = require("../models/Category");
const { userAuth } = require("../utils/Auth");

/* Private Routes */

//Get list of categories
router.get("/", (req, res) => {
    Recipe.find()
        .populate({
            path: "ingredients",
            populate: {
                path: "shape",
                model: "shape",
            },
        })
        .populate({
            path: "ingredients",
            populate: {
                path: "ingredient",
                model: "ingredient",
            },
        })
        .sort({ date: -1 })
        .then((recipes) => res.status(201).send(recipes))
        .catch((err) =>
            res.status(400).json({
                message: "Can't get the list of recipes",
                success: false,
                err,
            })
        );
});

//Get one category
router.get("/:recipeID", (req, res) => {
    const recipeID = req.params.id;
    Recipe.findOne({ _id: recipeID })
        .populate({
            path: "ingredients",
            populate: {
                path: "shape",
                model: "shape",
            },
        })
        .populate({
            path: "ingredients",
            populate: {
                path: "ingredient",
                model: "ingredient",
            },
        })
        .then((recipe) => res.status(201).send(recipe))
        .catch((err) =>
            res.status(400).json({
                message: "Can't get the recipe",
                success: false,
                err,
            })
        );
});

//Post a category
router.post(
    "/",
    [
        userAuth,
        // [
        //   body("name", "Recipe Name is required").notEmpty(),
        //   body("instructions", "Recipe instructions are required").notEmpty(),
        // ],
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "You have to fill out all the informations",
                success: false,
            });
        }
        const { name, instructions, ingredients } = req.body;
        const newRecipe = new Recipe({
            name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            user: req.user.id,
        });
        newRecipe
            .save()
            .then((recipe) =>
                res.status(200).json({
                    message: "Recipe created",
                    success: true,
                })
            )
            .catch((err) =>
                res.status(501).json(
                    {
                        message: "Can't create this recipe",
                        success: false,
                    },
                    console.log(err)
                )
            );
    }
);
//Delete a category
router.delete("/:id", (req, res) => {
    Recipe.findById(req.params.id)
        .then((recipe) => {
            if (!recipe) {
                return res.status(404).json({ msg: "Recipe not found" });
            } else {
                Recipe.findByIdAndDelete(req.params.id, (err, data) => {
                    res.json({ msg: "Recipe deleted" });
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: "Server error",
                success: false,
            });
        });
});
//Put a category
router.put("/:id", userAuth, (req, res) => {
    const { name, instructions, ingredients } = req.body;
    let recipeField = {};
    if (name) recipeField.name = name;
    if (instructions) recipeField.instructions = instructions;
    if (ingredients) recipeField.ingredients = ingredients;
    Recipe.findById(req.params.id).then((recipe) => {
        if (!recipe) {
            return res.status(404).json({ msg: "Recipe not found" });
        } else if (recipe.user.toString() !== req.user.id) {
            res.status(401).json({
                message: "Not authorized",
                success: false,
            });
        } else {
            Recipe.findByIdAndUpdate(
                req.params.id,
                { $set: recipeField },
                { new: true },
                (err, data) => {
                    res.status(200).json({
                        message: "Recipe information updated",
                        success: true,
                    });
                }
            );
        }
    });
});
module.exports = router;