
const handleSignIn = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    console.log(db)
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(response => {
            //console.log(response[0]);
            const isValid = bcrypt.compareSync(password, response[0].hash);
            console.log(isValid);
            if (isValid) {

                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'));

            } else {
                res.status(400).json('wrong credentails yea')
            }
        })
        .catch(err => res.status(400).json('hello'));

}

module.exports = {
    handleSignIn: handleSignIn
}