const handleRegister = (req, res, db, bcrypt) => {

    const { email, name, password } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json('incorrect form submission');
    }
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

}

module.exports = {
    handleRegister: handleRegister
};