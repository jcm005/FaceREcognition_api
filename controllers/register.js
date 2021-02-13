const handleRegister = (req, res, db, bcrypt) => {

    const { email, name, password } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json('incorrect form submission');
    }
    const hashpass = bcrypt.hashSync(password);
    // Store hash in your password DB.


    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => {
            res.json(user[0])
        })


        .catch(console.log)

}

module.exports = {
    handleRegister: handleRegister
};