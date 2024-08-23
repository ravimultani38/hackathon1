const express = require('express');
const router = express.Router();
const Person = require('./models/notifications'); // Use the correct path to your schema

// POST /person - Create a new Person
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("Data saved");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/", async (req, res) => {
    try {
        const { categories, school, timeline } = req.query;

        const query = {};
        if (categories) query.categories = categories;
        if (school) query.school = school; // Add school filter if needed
        
        if (timeline) {
            const now = new Date();
            let dateRange;

            switch (timeline) {
                case 'day':
                    dateRange = new Date(now.setDate(now.getDate() - 1));
                    break;
                case 'week':
                    dateRange = new Date(now.setDate(now.getDate() - 7));
                    break;
                case 'month':
                    dateRange = new Date(now.setMonth(now.getMonth() - 1));
                    break;
                default:
                    dateRange = null;
            }

            if (dateRange) {
                query.time = { $gte: dateRange };
            }
        }

        const data = await Person.find(query);
        console.log("Data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE /person/:category - Delete persons by category
router.delete("/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const response = await Person.deleteMany({ categories: category });
        console.log("Data deleted");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
