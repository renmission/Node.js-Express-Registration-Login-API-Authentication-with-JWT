const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    //GET Auth header value
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    // Check if bearer is undefined
    if (typeof token !== 'undefined') {
        // Split by space
        const bearer = token.split(' ');
        //GET token by array
        const bearerToken = bearer[1];
        // SET the token
        req.token = bearerToken;
    }

    try {
        const verified = jwt.verify(req.token, process.env.SECRET_KEY);
        req.user = verified;
    } catch (error) {
        res.status(400).send('Invalid Token');
    }

    next();
} 