const Student = require("../model/student.model");
const axios = require("axios");

exports.addStudent = async (req, res) => {
    try {
        const { name, subject, reason, teacherId } = req.body;

        if (!name || !subject || !reason || !teacherId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const student = await Student.create({
            name,
            subject,
            reason,
            addedBy: teacherId,
        });

        // 📩 Отправляем в Telegram
        const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        const message = `⚡️ Новый ученик в detention:\n\n👤 Имя: ${student.name}\n📘 Предмет: ${student.subject}\n❗ Причина: ${student.reason}\n👨‍🏫 Учитель ID: ${teacherId}\n🕒 ${student.createdAt.toLocaleString()}`;

        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });

        res.status(201).json({ message: "Student added successfully", student });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
