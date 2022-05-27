const express = require('express');
const router = express.Router();
const path = require("path");
const db = require('../api/db.json');
const jsonServer = require('json-server');
const fs = require('fs');
const mongoClient = require('mongodb').MongoClient;
const User = require('../models/user-model.js');

const insertDB = (newUser) => {
    return new Promise((resolve, reject) => {
        mongoClient.connect('mongodb+srv://tttm15012001:Yeubemai%40151@cluster0.u8ris.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
            if(err) throw err;

            console.log('Connected');
            const database = client.db('case-study');
            const collection = database.collection('users');

            collection.insertOne(newUser, (err, res) => {
                if(err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log('Updated');
                    client.close();
                    console.log('Disconnected');
                    resolve();
                }
            });
        })
    })
}

const updateDB = (newUser) => {
    console.log(newUser);
    return new Promise((resolve) => {
        mongoClient.connect('mongodb+srv://tttm15012001:Yeubemai%40151@cluster0.u8ris.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
            if(err) throw err;

            console.log('Connected');
            const database = client.db('case-study');
            const collection = database.collection('users');

            collection.updateOne(
                {id: newUser.id},
                {
                    $set: {
                        name: newUser.name,
                        username: newUser.username,
                        password: newUser.password,
                        address: newUser.address,
                        age: newUser.age,
                        phone: newUser.phone
                    }
                }
            )
            resolve();
        })
    })
}

const updateOrder = (newUser, newOrder) => {
    console.log(newUser);
    return new Promise((resolve) => {
        mongoClient.connect('mongodb+srv://tttm15012001:Yeubemai%40151@cluster0.u8ris.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
            if(err) throw err;

            console.log('Connected');
            const database = client.db('case-study');
            const collection = database.collection('users');

            collection.updateOne(
                {id: newUser.id},
                {
                    $set: {
                        orders: newOrder
                    }
                }
            )
            resolve();
        })
    })
}

router.get('/goods', jsonServer.defaults(), jsonServer.router(db));

router.get('/users', jsonServer.defaults(), jsonServer.router(db));

router.get('/users/:id', jsonServer.defaults(), jsonServer.router(db));

router.post('/users', (request, response) => {
    fs.readFile(path.join(__dirname, '../api/db.json'), (err, data) => {
        if(err) throw err;
        else {
            let db = (JSON.parse(data));
            oldUsers = db.users;
            let duplicate = oldUsers.find(item => item.username === request.body.username);
            console.log(request.body);
            console.log(duplicate);
            if(duplicate != null) {
                return response.status(400).json({
                    'msg': `${request.body.username} is invalid!`
                });
            } else {
                const newUser = new User({
                    id: oldUsers.length,
                    name: request.body.name,
                    username: request.body.username,
                    password: request.body.password,
                    address: request.body.address,
                    age: request.body.age,
                    phone: request.body.phone,
                    orders: request.body.orders
                });

                //Update user database

                insertDB(newUser).then(() => {
                    oldUsers.push(newUser);
                    db = {...db, users: oldUsers};
                    console.log(db);
                    json = JSON.stringify(db, null, 2);
                    fs.writeFile(path.join(__dirname, '../api/db.json'), json, (err) => {
                        if(err) throw err;
                        console.log('Update!');
                        return response.status(200).json({
                            'msg': `Successfully register for ${request.body.username}!`,
                            'username': request.body.username
                        });
                    });
                })

                /* else if(userValid != null) {
                    let newUser = oldUsers.filter(item => item._id !== userValid._id);
                    userValid = {...request.body};
                    console.log(userValid);
                    newUser.push(userValid);
                    db = {...db, users: newUser};
                    json = JSON.stringify(db, null, 2);
                    fs.writeFile(path.join(__dirname, '../api/db.json'), json, (err) => {
                        if(err) throw err;
                        console.log('Update!');
                    });
                    return response.status(200).json({
                        'msg': `Your profile is updated!`,
                        'username': request.body.username
                    });
                }  */
            }
        }
    });
});

router.put('/users', (request, response) => {
    fs.readFile(path.join(__dirname, '../api/db.json'), (err, data) => {
        if(err) throw err;
        else {
            let db = JSON.parse(data);
            let users = db.users;
            if(users.find(item => item.username == request.body.username) != null) {
                return response.status(400).json({
                    'msg': `Your username is invalid!`,
                    'username': request.body.username
                });
            } else {
                users.map((item, index) => {
                    if(item.id == request.body.id) {
                        users[index].name = request.body.name;
                        users[index].username = request.body.username;
                        users[index].password = request.body.password;
                        users[index].address = request.body.address;
                        users[index].age = request.body.age;
                        users[index].phone = request.body.phone;
                    }
                })
                console.log(users);
                updateDB(request.body).then(() => {
                    db = {...db, users: users};
                    json = JSON.stringify(db, null, 2);
                    fs.writeFile(path.join(__dirname, '../api/db.json'), json, (err) => {
                        if(err) throw err;
                        console.log('Update!');
                        return response.status(200).json({
                            'msg': `Your profile is updated!`,
                            'username': request.body.username
                        });
                    });
                })
            }
        }
    })
})

router.post('/users/:id', (request, response) => {
    fs.readFile(path.join(__dirname, '../api/db.json'), (err, data) => {
        if(err) throw err;
        else {
            let db = JSON.parse(data);
            let users = db.users;
            let newOrder = {
                'id': request.body.oid,
                'name': request.body.name,
                'things': request.body.things,
                'cost': request.body.cost,
                'address': request.body.address,
                'phone': request.body.phone
            }
            let _id = 0;
            users.map((item, index) => {
                if(item.id == request.body.id) {
                    let orders = item.orders;
                    _id = index;
                    orders.push(newOrder);
                    users[index].orders = orders;
                }
            })
            console.log(users);
            updateOrder(request.body, users[_id].orders).then(() => {
                db = {...db, users: users};
                json = JSON.stringify(db, null, 2);
                fs.writeFile(path.join(__dirname, '../api/db.json'), json, (err) => {
                    if(err) throw err;
                    console.log('Update!');
                    return response.status(200).json({
                        'msg': `Your order is updated!`
                    });
                });
            })
        }
    })
})

module.exports = router;