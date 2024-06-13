import User from "../model/usermodel.js";
import {
  SignUpValidator,
  signInValidator,
} from "../validator/authValidator.js";
import formatZodError from "../utils/appError.js";
import cryptoHash from "node:crypto";
import generateToken from "../utils/generateTokenandsetCookies.js";

function hashValue(value) {
  const hash = cryptoHash.createHash("sha256");
  hash.update(value);
  return hash.digest("hex");
}

function comparePasswords(inputPassword, hashedPassword) {
  return hashValue(inputPassword) === hashedPassword;
}

export const signUp = async (req, res, next) => {
    const registerResults = SignUpValidator.safeParse(req.body);
  
    if (!registerResults.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: registerResults.error.issues.map(issue => issue.message)
      });
    }
  
    try {
      const { userName, phoneNumber, name, password, confirmPassword } = req.body;
      const user = await User.findOne({
        $or: [{ userName }, { phoneNumber }],
      });
  
      if (user) {
        return res.status(409).json({ message: "User already exists" });
      }
  
      if (password !== confirmPassword) {
        return res.status(403).json({ message: "Password and confirmPassword do not match" });
      }
  
      const encryptedPassword = hashValue(password);
      const newUser = new User({
        name,
        userName,
        password: encryptedPassword,
        phoneNumber,
      });
  
      await newUser.save();
      res.status(201).json({ message: "User registered successfully", newUser });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.error(error.message);
    }
  };

export const signIn = async (req, res, next) => {
  const loginResults = signInValidator.safeParse(req.body);
  if (!loginResults) {
    return res.status(400).json(formatZodError(loginResults.error.issues));
  }
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "User with userName not found!" });
    }

    const comparePass = comparePasswords(password, user.password);
    if (!comparePass) {
      res.status(400).json({ message: "Password is incorrect" });
    }
    const accessToken = generateToken(user._id, res);

    res.status(200).json({
        token: accessToken,
        message: "Login successful",
        data: {user}
    
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  


export const logout = async (req, res, next) => {};
