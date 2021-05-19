const bcrypt= require('bcryptjs')
module.exports ={
    register: async (req,res) =>{
        const db= req.app.get ('db')
        const {username, password}= req.body
        const [foundUser]= await db.user.find_user_by_username([username])
        const profile_pic = `https://robohash.org/${username}`
        if(foundUser) {
        return res.status(409).send("Sorry, username already registered")
    }
        const salt= bcrypt.genSaltSync(15)
        const hash= bcrypt.hashSync (password, salt)
        const [user]= await db.user.create_user([username, hash, profile_pic])
        delete user.password
        req.session.user=user[0]
        return res.status(200).send(req.session.user)
    },
    login: async (req,res) =>{
        const db= req.app.get('db')
        const {username, password}= req.body
        const foundUser= await db.user.find_user_by_username([username])
        if(!foundUser[0]) return res.status(409).send("Sorry, incorrect username or password");
        const authenticated = bcrypt.compareSync(password,foundUser.password)
        if (authenticated){
            delete foundUser[0].password
            req.session.user=foundUser[0]
            res.status(200).send(req.session.user)
        } else{
            return res.status(401).send('incorrect username or password')
        }
    },
    logout: async (req,res) =>{
        req.session.destroy()
        res.status(200)
    },
    getUser: async (req,res)=>{
        if (req.session.user){
            return res.status(200).send(req.session.user)
        }else{
            return res.status(401).send('Please login')
            }
    }
}