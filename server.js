const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

const database = {
    users: [
        {

            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()

        },
        {

            id: '1234',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'yup',
            entries: 0,
            joined: new Date()

        },

    ],

    login: [
        {
            id: 987,
            hash: '',
            email: 'john@gmail.com',
        }
    ]
};

app.use(bodyParser.json());
app.use(cors());



app.post('/signin', (req, res) => {
    console.log(req.body.email, req.body.password);
    console.log(database.users[0].email, database.users[0].password)
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.user[0]);
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {

    const { email, name, password } = req.body;
    const hashpass = bcrypt.hash(password, null, null, function (err, hash) {
        // Store hash in your password DB.
        console.log(hash);
    });

    database.users.push({

        id: '125',
        name: name,
        email: email,
        password: hashpass,
        entries: 0,
        joined: new Date()

    })
    res.json(database.users[database.users.length - 1])
})

app.get('/', (req, res) => {

    res.send(database.users)
})

app.get('/profile/:id', (req, res) => {

    const { id } = req.params;
    let found = false; // let because we are reassigning it 
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false; // let because we are reassigning it 
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }


    // ----------------------------------------
})

const port = 3010

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})





//root route 
// signin route
// register post request
//profile

// bcrypt node js

