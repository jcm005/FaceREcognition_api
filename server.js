const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({

    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
        rejectUnauthorized: false
    }
});



const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => { res.send('its working') });
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) });


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.listen(process.env.PORT || 3000, () => {
    console.log(`app is listening on ${process.env.PORT}`)
})
