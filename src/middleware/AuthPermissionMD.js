const jwt = require('jsonwebtoken');
// const config = require('config');

module.exports = (req, res, nxt) => {
    // get x-auth-token header
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(401).send('Access Denied..');
    try {
        const decodedPayLoad = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // const decodedPayLoad = jwt.verify(token, config.get("jwtsec"));
        
        // check user role(Admin or Not )
        if (!decodedPayLoad.adminRole)
            return res.status(401).send("Access Denied..");
        nxt();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }



};