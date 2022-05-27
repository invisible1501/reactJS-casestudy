const express = require('express');
const router = express.Router();
const path = require("path");
const db = require('../api/db.json');
const jsonServer = require('json-server');
const fs = require('fs');

router.get('/goods/:id', jsonServer.defaults(), jsonServer.router(db));

router.get('/users', jsonServer.defaults(), jsonServer.router(db));

module.exports = router;