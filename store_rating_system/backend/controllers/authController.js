const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users
      (name,email,address,password,role)
      VALUES(?,?,?,?,?)`,
      [name, email, address, hashedPassword, "USER"]
    );

    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (user.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user[0].password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user[0].id,
        role: user[0].role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      token,
      role: user[0].role,
      userId: user[0].id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const [user] = await db.query(
      "SELECT * FROM users WHERE id=?",
      [req.user.id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const match = await bcrypt.compare(
      oldPassword,
      user[0].password
    );

    if (!match) {
      return res.status(400).json({
        message: "Old Password Incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await db.query(
      "UPDATE users SET password=? WHERE id=?",
      [hashedPassword, req.user.id]
    );

    res.json({
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  changePassword,
};