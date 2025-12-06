 import User from "../Models/userModels.js";
import bcryptjs from "bcryptjs";
import jwtToken from "../utils/jwtwebToken.js";

export const userRegister = async (req, res) => {
    try {
        const { fullname, username, email, gender, password, profilepic } = req.body;

        // Check if user exists
        const userExist = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (userExist) {
            return res.status(409).send({
                success: false,
                message: "Username or Email Already Exists"
            });
        }

        // Hash password
        const hashPassword = bcryptjs.hashSync(password, 10);

        // Default profile pictures
        const profileBoy = profilepic || `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profileGirl = profilepic || `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create user
        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profilepic: gender === "male" ? profileBoy : profileGirl
        });

        if(newUser) {
            // Create JWT
         await newUser.save();

         jwtToken(newUser._id, res)
        } else {
            res.status(500).send({success: false, message: "Invalid User Data"})
        }

        

        res.status(201).send({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilepic: newUser.profilepic,
            email: newUser.email,
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};



// Login route


export const userLogin = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})

        if (!user) return res.status(500).send({
                success: false,
                message: "Username or Email does not Exists"
            });
            const comparePass = bcryptjs.compareSync(password, user.password || " ")

            if(!comparePass) return res.status(500).send({
                success: false,
                message: "Username or Email does not Exists"
            });
         
            jwtToken(user._id, res)


            res.status(200).send({
                 _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilepic: user.profilepic,
            email: user.email,
            message : "Succesful Login"

            })
    } catch (error) {
        
         res.status(500).send({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}



// logout route

export const userLogout = async(req, res) => {

    try {
        res.cookie("jwt", '' ,{
            maxAge: 0

         })
         res.status(200).send({message: "user Loggedout"})
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Server error",
            error: error.message
        });
        
    }
}