const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


class CustController{
    static googleSignIn(req, res, next){
        const {token} = req.body
        let email
        const password = `GOO${Math.random()*Number(process.env.DEFAULT_PASSWORD)}`
        let status = 200
        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket=>{
            email = ticket.payload.email
            return User.findOne({
                where: {email}
            })
        })
        .then(user=>{
            if(user) return user
            status = 201
            return User.create({email, password, role: 'Customer'})
        })
        .then(result=>{
            const payload = {
                user_id: result.id
            }
            const access_token = jwt.sign(payload, process.env.JWT_SECRET)
            res.status(status).json({message: 'Login Success', access_token})
        })
        .catch(err=>{
            next(err)
        })
    }
    static register(req, res, next){
        const {email, password} = req.body
        User.create({
            email,
            password,
            role: 'Customer'   
        })
        .then(result=>{
            res.status(201).json({message: 'Successfully Register', email: result.email})
        })
        .catch(err=>{
            next(err)
        })
    }
    static login(req, res, next){
        const {email, password} = req.body
        User.findOne({
            where: {email}
        })
        .then(result=>{
            const compare = bcrypt.compareSync(password, result.password)
            if(compare){
                const payload = {
                    userId: result.id
                }
                const access_token = jwt.sign(payload, process.env.JWT_SECRET)
                res.status(200).json({access_token})
            }else{
                throw{name: 'LOGIN_FAILED'}
            }
        })
        .catch(err=>{
            next({name: 'LOGIN_FAILED'})
        })
    }
}

module.exports = CustController