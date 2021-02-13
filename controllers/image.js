const Clarifai = require('clarifai');

const app = new Clarifai.App({ apiKey: '8574ae4ec5094e459de26dbf89fe7742' });

const handleAPICall = (req, res) => {

    console.log(req.body.input)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('cannot work with api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(console.log)
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
}