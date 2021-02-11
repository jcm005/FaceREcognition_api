const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const db = knex({

    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'joemattern',
        password: '',
        database: 'facereco'
    }
});



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
    db.select('email', 'hash').from('login')
        .then(response => {
            console.log(response);
        })
})

app.post('/register', (req, res) => {

    const { email, name, password } = req.body;
    const hashpass = bcrypt.hashSync(password);
    // Store hash in your password DB.

    db.transaction(trx => {
        trx.insert({
            hash: hashpass,
            email: email,
        })
            .into('login')
            .returning('email')
            .then(logInEmail => {

                return trx('users')
                    .returning('*')
                    .insert({
                        email: logInEmail[0],
                        name: name,
                        joined: new Date()
                    }).then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })


        .catch(err => {
            res.status(400).json('unable to register')
        })

})

app.get('/', (req, res) => {

    res.json('yup');

})

app.get('/profile/:id', (req, res) => {

    const { id } = req.params;
    db.select('*').from('users').where({
        id: id
    })
        .then(user => {
            res.json(user[0])
        })
})

app.put('/image', (req, res) => {
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

const port = 3004

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})





//root route 
// signin route
// register post request
//profile

// bcrypt node js

// brew services start postgresql