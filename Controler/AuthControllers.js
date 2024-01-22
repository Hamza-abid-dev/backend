const Userschema = require('../Models/Userschema')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const Userregister = async(req, res)=>{
    const {name, email, password, contact} = req.body
    if(!name || !email || !password || !contact) {
        return res.send({Message: "please fill all the feilds"})
    }
    const emailcheck = await Userschema.findOne({email})
    if(emailcheck){
        return res.send({Message: "email already in use"})
    }
    const hash = await bcrypt.hash(password , 10)
    const savedata = new Userschema({name, email, password:hash, contact})

    const result = await savedata.save()
    if(result){
        return res.send({Message: "User Save Success"})
    }else{
        return res.send({Message: "User Save Failure"})
    }
}
const loginuser = async(req, res)=>{
    const {email, password} = req.body
    const checkuser = await Userschema.findOne({email})
    if(!checkuser){
        return res.send({Message: "User not found"})
    }
    const comparepassword = bcrypt.compare(password, checkuser.password)
    // const checkpassword = checkuser && password === checkuser.password
    const token = jwt.sign({id: checkuser._id} , process.env.jwtkey)
    if(comparepassword){
        return res.send({Message: 'User Login', token})
    }else{
        return res.send({Message: 'Invalid password'})
    }
}
const userget = async (req, res)=>{
    const user = await Userschema.find()
    if(user.length > 0){
        res.send(user)
    }else{
        res.send({Message: "no user found"})
    }
}
const userdelete = async(req, res) => {
        const id = req.params.id
        const checkuser = await Userschema.findOne({_id : id})
        if(!checkuser) {
            return res.send({Message: "no user found"})
        }
        const deleteuser = await Userschema.findByIdAndDelete(id)
        if(deleteuser) {
            return res.send({Message: "user deleted"})
        }else{
            return res.send({Message: "user not deleted"})
        }
    }
    const getuser = async(req, res) => {
        const id = req.params.id
        const searchuser = await Userschema.findById(id)
        if(searchuser){
            return res.send(searchuser)
        }else{
            res.send({Message:'User not found'})
        }
    }
const edituser = async(req, res) => {
        const id = req.params.id
        const updateddata = req.body
        const updatedata = await Userschema.findByIdAndUpdate(id, updateddata, {
            new:true,
        })
        if(updatedata){
             return res.send({Message: 'data is updated successfully', updatedata})
        }else{
            return res.send({Message: 'data is not updated'})
        }
    }
    const testjwt = (req, res)=>{
        return res.send({Message: 'Route Accessed'})
    }
module.exports = {Userregister, userget, userdelete, edituser, getuser, loginuser, testjwt}