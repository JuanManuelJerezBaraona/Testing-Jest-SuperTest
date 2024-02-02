require('dotenv').config();
const { faker } = require('@faker-js/faker');
const jwt = require('jsonwebtoken');

const generateJWT = () => {
    const email = faker.internet.email();
    return jwt.sign({email}, process.env.JWT_SECRET, {
        expiresIn: '60s'
    });
};

module.exports = generateJWT;