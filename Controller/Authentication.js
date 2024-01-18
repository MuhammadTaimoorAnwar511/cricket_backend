const Player = require('../Models/Player');

exports.signup = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check if the username already exists
        const existingUser = await Player.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create a new player with the provided username, password, and role
        const newPlayer = new Player({
            username,
            password,
            role,
        });

        // Save the new player to the database
        await newPlayer.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username exists
        const existingUser = await Player.findOne({ username });
        if (!existingUser) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Check if the password matches
        if (existingUser.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // If both username and password are correct, you can consider the user as logged in
        return res.status(200).json({ message: 'Login successful', role: existingUser.role ,id: existingUser._id });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};