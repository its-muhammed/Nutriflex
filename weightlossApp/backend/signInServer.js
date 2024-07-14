const express = require('express');
const bodyParser = require('body-parser');
const db = require('./firebase-config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const cors = require('cors');

router.use(bodyParser.json());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let userData = null;
let userData_1 = null;
let userData_2 = null;
let userData_3 = null;

router.use(cors());

const signIn = router.post("/SignUp", async (req, res) => {
    try {
        const emailExists = await db.userRef.where('email', '==', req.body.email).get();
        if (!emailExists.empty) {
            return res.status(200).json({ exists: true, message: "Email already exists, try again with a different email!" });
        }

        const email = req.body.email;
        const password = req.body.password;
        const userID = req.body.uid; // Ensure you receive 'uid' from client or generate it

        const hashedPassword = await bcrypt.hash(password, 8);

        userData = {
            email: email,
            password: hashedPassword,
            uid: userID, // Assign 'uid' here
        };

        const user = { email: email };
        const token = jwt.sign(user, process.env.TOKEN_KEY);
        res.header("auth-token", token).send(token);

    } catch (error) {
        console.error("Error in SignUp:", error);
        res.status(500).json({ error: "Error in database connection" });
    }
});


const custom_1Data = router.post("/Gender", async (req, res) => {
    try {
        const gender = req.body.gender;

        userData_1 = {
            gender: gender,
        };

        res.send({ success: true, message: "Received gender data!" });

    } catch (error) {
        console.error("Error in Gender endpoint:", error);
        res.status(500).json({ error: "Error in database connection" });
    }
});

const custom_2Data = router.post("/PersonalInfo", async (req, res) => {
    try {
        const name = req.body.name;
        const age = req.body.age;
        const height = req.body.height;
        const weight = req.body.weight;

        userData_2 = {
            name: name,
            age: age,
            height: height,
            weight: weight,
        };

        res.send({ success: true, message: "Received personal info data!" });

    } catch (error) {
        console.error("Error in PersonalInfo endpoint:", error);
        res.status(500).json({ error: "Error in database connection" });
    }
});

const custom_3Data = router.post("/GoalSetting", async (req, res) => {
    try {
        const weightLossGoal = req.body.weightLossGoal;

        // Ensure userData is properly populated with uid
        if (!userData || !userData.uid) {
            return res.status(400).json({ error: "User data is missing 'uid'." });
        }

        const userData_3 = {
            weightLossGoal: weightLossGoal,
        };

        // Combine all user data into one object
        const combinedData = {
            ...userData,
            ...userData_1,
            ...userData_2,
            ...userData_3,
        };

        // Clean up undefined properties
        const cleanedData = cleanObject(combinedData);

        // Assuming db.userRef is properly initialized
        await db.userRef.doc(userData.uid).set(cleanedData);

        res.send({ success: true, UID: userData.uid });

    } catch (error) {
        console.error("Error in GoalSetting endpoint:", error);
        res.status(500).json({ error: "Internal server error occurred." });
    }
});

// Helper function to clean object by removing undefined properties
function cleanObject(obj) {
    const cleaned = {};
    Object.keys(obj).forEach(key => {
        if (obj[key] !== undefined) {
            cleaned[key] = obj[key];
        }
    });
    return cleaned;
}



module.exports = router;
