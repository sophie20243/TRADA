import User from '../model/usermodel.js';
import { SignUpValidator, signInValidator } from '../validator/authValidator.js';
import formatZodError from '../utils/appError.js'
import cryptoHash from 'node:crypto';
// import generateToken from '../utils/generateTokenandsetCookies.js';

function hashValue(value) {
    const hash = cryptoHash.createHash('sha256');
    hash.update(value);
    return hash.digest('hex')
}

function comparePasswords(inputPassword, hashedPassword) {
    return hashValue(inputPassword)===hashedPassword
};


export const signUp = async (req, res, next) => {
    const registerResults = SignUpValidator.safeParse(req.body)
    if(!registerResults) {
        return res.status(400).json(formatZodError
            (registerResults.error.issues))
    }
    try {
        const {userName, phoneNumber, email} = req.body
        const user = await User.findOne({$or:[{userName}, {email}, {phoneNumber}]})
        if (user) {
            res.status(409).json({message: 'user already exist`s'})
        } else{
            const {
                name,
                userName,
                password,
                confirmPassword,
                phoneNumber,
            } = req.body

             if(password !== confirmPassword) {
                return res.status(403).json({message: 'password and confirmPassword do not match'});
            }
            const encryption = hashValue (password, confirmPassword);
             const newUser = new User({
                name,
                userName,
                password: encryption,
                confirmPassword: encryption,
                phoneNumber,
            })

        
            await newUser.save()
            res.status(200).json({message:'User registered succesfully', newUser})
            console.log('User registered succesfully', newUser);
        }
    }
 catch (error) {
    res.status(500).json({message: error.message})
    console.log(error.message);}
}

export const signIn = async ( req, res, next) => {
    const loginResults = signInValidator.safeParse(req.body)
    if(!loginResults) {
        return res.status(400).json(formatZodError
            (loginResults.error.issues))
    }
    try {
        const {userName, password} = req.body
        const user = await User.findOne({userName})
        if(!user){
            return res.status(400).json({message: "User with userNmae not found!"});
        }

        const comparePass = comparePasswords(password, user.password);
        if (!comparePass){
            res.status(400).json({message: "Password is incorrect"})
        }
      const accessToken = generateToken(user._id, res);

        res.status(200).json({message: "Login Successful", accessToken})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getSingleUsers = async() =>{}

export const logout = async ( req, res ,next) => {

}