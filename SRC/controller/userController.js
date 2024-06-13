import User from "../model/usermodel.js"

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        if (!allUsers) {
            res.status(404).json({message: "No users found in the DB"})
        } else {
            res.status(404).json({message: "users found successfully", allUsers})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
}

export const getSingleUser = async (req, res) => {
    const userId = ( req.params.id )
    try {
        const singleUser = await User.findById(userId)
        if (!singleUser) {
            res.status(404).json({message: "No user found with this id"})
        } else {
            res.status(200).json({message:"User found successfully", singleUser})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
}

export const deleteUser = async (req, res) => {
    const userId = ( req.params.id )
    try {
        const singleUser = await User.findByIdAndDelete(userId)
        if (!singleUser) {
            res.status(404).json({message: "No user found with this id"})
        } else {
            res.status(200).json({message:"User deleted successfully", singleUser})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
}

export const updateUser = async (req, res) => {
    const userId = ( req.params.id )
    try {
        const singleUser = await User.findByIdAndUpdate(userId)
        if (!singleUser) {
            res.status(404).json({message: "No user found with this id"})
        } else {
            res.status().json({message:"User found successfully", singleUser})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
}