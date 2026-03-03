import jwt from "jsonwebtoken";
import User from "../models/UsersShema.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";
import LoginActivity from "../models/UserLoginActivity.js";

// register
export const setRegister = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ msg: "Email already Registered" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{3,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedpassword,
      authorizedType: "local",
      role,
    });

    return res.status(201).json({
      msg: "Registered Successfully",
      data: true,
      authorizedType: "local",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login
export const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "User not registered" });
  }

  if (user.authorizedType === "google") {
    return res.status(400).json({
      msg: "This account uses Google Sign-In",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({ msg: "Login Failed" });
  }
  try {
    const Accesstoken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        authProvider: "local",
      },
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: "15m" },
    );

    const RefreshToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        authProvider: "local",
      },
      process.env.REFRESH_JWT_SECRET,
      { expiresIn: "7D" },
    );

    res.cookie("accessToken", Accesstoken, {
      signed: true,
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 5 * 60 * 1000, // 15 mins
    });

    res.cookie("refreshToken", RefreshToken, {
      signed: true,
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      msg: "Login Success",
      user: {
        isLogin: true,
        _id: user._id,
        roleData: user.role,
        email: user.email,
        authProvider: "local",
        loginActivity: Date.now(),
      },
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Check Email Exist
export const EmailExist = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ msg: "Token missing" });
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(400).json({ msg: "Invalid token payload" });
    }

    const email = payload.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        msg: "Not Exist",
        emailExist: false,
      });
    }

    if (user) {
      return res.json({
        msg: "Exist",
        emailExist: true,
        roleData: user.role,
      });
    }
  } catch (err) {
    console.log("EmailExist Error:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};


// google login
export const googleAuthLogin = async (req, res) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { token, Role } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        picture,
        googleId,
        role: Role,
        authorizedType: "google",
      });
    }

    const AccessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        authProvider: "google",
      },
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: "15m" },
    );

    const RefreshToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        authProvider: "google",
      },
      process.env.REFRESH_JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("accessToken", AccessToken, {
      httpOnly: true,
      signed: true,
            sameSite: "None",
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", RefreshToken, {
      httpOnly: true,
      signed: true,
            sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      msg: "Google Login success",
      user: {
        isLogin: true,
        roleData: user.role,
        email: user.email,
        _id: user._id,
        name: user.name,
        picture: user.picture,
        authprovider: "google",
        loginActivity: Date.now(),
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



// Refresh Token
export const RefreshToken = async (req, res) => {
  try {
    const refreshToken = req.signedCookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        role: decoded.role,
        email: decoded.email,
        authProvider: decoded.authProvider,
      },
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: "7D" },
    );

    res.cookie("accessToken", newAccessToken, {
      signed: true,
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(403);
  }
};



// Forget password
export const ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    if (user.authorizedType === "google") {
      return res.status(400).json({
        msg: "This account uses Google Sign-In",
      });
    }

    // crypto token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1hr

    await user.save();

    const reseturl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // send Mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MY_GMAIL,
      to: email,
      subject: "Reset Your Password",
      text: `Hello ${email},\n\nClick this link to reset your password:\n${`${reseturl}`}\n\nLink expires in 1 hour`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      msg: `Reset Password link sent to your email`,
      data: reseturl,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Reset Password
export const ResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({ msg: "Token Invalid or Expired" });
    }

    if (user.authorizedType === "google") {
      return res.status(400).json({
        msg: "This account uses Google Sign-In",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ msg: "Password successfully reserted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Private Response
export const privateMsg = (req, res) => {
  res.json({
    result: true,
    msg: "Private route access granded",
  });
};



// Login Refresh
export const Me = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      user: {
        isLogin: true,
        roleData: user.role,
        email: user.email,
        name: user.name,
        _id: user._id,
        picture: user.picture,
        authProvider: req.user.authProvider,
        loginActivity: Date.now(),
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Log Out
export const Logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      signed: true,
      sameSite: "None",
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      signed: true,
     sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      msg: "Logged out successfully",
      isLogout: true,
      logoutActivity: Date.now(),
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const Login_Activity = async (req, res) => {
  try {
    await LoginActivity.findOneAndUpdate(
      { userId: req.userId },
      {
        userRole: req.role,
        $push: { loginHistory: new Date() },
      },
      {
        new: true,
        upsert: true,
      },
    );

    res.json({ msg: "Login activity updated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const Login_Activty_Get = async (req, res) => {
  try {
    const Exist = await LoginActivity.findOne({ userId: req.userId });

    if (!Exist) {
      return res
        .status(404)
        .json({ msg: "No previous login activity found for this user." });
    }

    const loginActivity = await LoginActivity.findOne({ userId: req.userId });

    res.json({ msg: "Login Activity Recieved", data: loginActivity });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
