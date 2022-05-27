const User = require('../models/user-model.js');

exports.create = (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        phone: req.body.phone
    })

    note.save()
        .then(
            res.status(200).json({
                'msg': `Successfully register for ${request.Body.username}!`,
                'username': request.Body.username
            })
        )
        .catch(
            
        )
}