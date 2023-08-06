const express=require("express")
const { getAllUsers, regiserController, loginController } = require("../controllers/userController")

// router objects
const router=express.Router()
// get all users
router.get("/all-users",getAllUsers)
// create users
router.post("/register",regiserController)
// login
router.post("/login",loginController)

module.exports=router