# Node.js Express Registration Login API Authentication with JWT

> npm i or npm install

After you install all the dependencies just run node app or just nodemon

-- Use Postman https://www.getpostman.com/ or Insomia https://insomnia.rest/

API also included:

> npm i mongoose

-- Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

> npm i dotenv

-- Storing configuration in the environment separate from code is based

> npm i @hapi/joi

-- The most powerful schema description language and data validator for JavaScript.

> npm i bcrypt

-- A library to help you hash passwords.

## JSON Web Tokens.

> npm i jsonwebtoken


> const jwt = require('jsonwebtoken');
>
> module.exports = (req, res, next) => {
>
>    //GET Auth header value
>    const token = req.header('auth-token');
>    if (!token) return res.status(401).send('Access Denied');
>
>    // Check if bearer is undefined
>    if (typeof token !== 'undefined') {
>        // Split by space
>        const bearer = token.split(' ');
>       //GET token by array
>       const bearerToken = bearer[1];
>        // SET the token
>        req.token = bearerToken;
>    }
>
>    try {
>        const verified = jwt.verify(req.token, process.env.SECRET_KEY);
>        req.user = verified;
>    } catch (error) {
>        res.status(400).send('Invalid Token');
>    }
>
>    next();
> } 

