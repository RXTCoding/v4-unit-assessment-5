const bcrypt= require('bcrypt')
module.exports ={
    register: async (req,res) =>{
        const db= req.app.get ('db')
        const {email, password}= req.body
        const foundUser= await db.getUser([email])
        if(foundUser[0]) return res.status(409).send("Sorry, email already registered");
        const salt= bcrypt.genSaltSync(15)
        const hash= bcrypt.hashSync (password, salt)
        const newUser= await db.create_user([email,hash])
        req.session.user=newUser[0]
        req.status(200).send(req.session.user)
    },
    login: async (req,res) =>{
        const db= req.app.get('db')
        const {email, password}= req.body
        const foundUser= await db.getUser([email])
        if(!foundUser[0]) return res.status(409).send("Sorry, incorrect username or password");
        const authenticated = bcrypt.compareSync(password,foundUser[0].password)
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
        res.sendStatus(200)
    },
    getUser: async (req,res)=>{
        if (authenticated){
            res.status(200).send(req.session.user)
        }else{
            return res.status(401).send('Incorrect username or password')
            }
    }
}