// backend/src/controllers/auth.controller.js
const User = require("../model/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// 📍 Регистрация (signup)
exports.signup = async (req, res) => {
    try {
        const { name, email, password, phoneNum } = req.body;

        // Проверка: есть ли пользователь
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Хэшируем пароль
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phoneNum,
        });

        res.status(201).json({
            message: "User registered successfully",
            userId: newUser._id,
            email: newUser.email,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// 📍 Вход (signin)
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Проверяем пароль
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Генерация JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// 📍 Выход (logout)
exports.logout = async (req, res) => {
    try {
        // Если используем токены без базы — просто говорим клиенту удалить токен
        res.status(200).json({ message: "Logout successful, please remove token on client side" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
