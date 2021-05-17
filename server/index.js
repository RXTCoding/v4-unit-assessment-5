require('dotenv').config();
const express = require('express'),
      userCtrl = require('./controllers/user'),
      postCtrl = require('./controllers/posts')
const massive= require ('massive')
const bcrypt= require('bcrypt')
const session= require('express-session')

const {SERVER_PORT, CONNECTION_STRING, SECRET_SESSION}= process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl:{
        rejectUnauthorized:false 
    }
}).then((db)=>{
    app.set("db", db)
    app.listen(4000, () => console.log(`running on ${4000}`))

}).catch((err)=> console.log(err))


const app = express();

app.use(express.json());
app.use(session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

