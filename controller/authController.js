
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/Auth'); // Assuming you have a User model
 // You can store the secret key in the .env file

module.exports = {
    createUser: async (req, res) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ status: false, message: "Invalid email format" });
        }

        // Validate password length
        const minPasswordLength = 8;
        if (req.body.password.length < minPasswordLength) {
            return res.status(400).json({ status: false, message: "Password should be at least " + minPasswordLength + " characters long" });
        }

        try {
            const emailExist = await User.findOne({ email: req.body.email });
            if (emailExist) {
                return res.status(400).json({ status: false, message: "Email already exists" });
            }

            // Hash the password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const user = await User({
                email: req.body.email,
                password: hashedPassword
            });
            await user.save();

            res.status(201).json({ status: true, message: "User created successfully", user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    loginUser: async (req, res) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ status: false, message: "Invalid email format" });
        }
    
        // Validate password length
        const minPasswordLength = 8;
        if (req.body.password.length < minPasswordLength) {
            return res.status(400).json({ status: false, message: "Password should be at least " + minPasswordLength + " characters long" });
        }
    
        try {
            const user = await User.findOne({ email: req.body.email }, { __v: 0, createdAt: 0, updatedAt: 0 });
            if (!user) {
                return res.status(401).json({ status: false, message: "User not found, check your email address" });
            }
    
            // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(401).json({ status: false, message: "Wrong password" });
            }
    
            const userToken = jwt.sign({
                id: user._id, userType: user.userType, email: user.email, fcm: user.fcm,
            }, process.env.JWT_SEC, { expiresIn: "21d" });
    
            const { password, otp, ...others } = user._doc;
    
            res.status(200).json({ ...others, userToken });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
};
