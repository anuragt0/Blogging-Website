const jwt = require("jsonwebtoken");


const authenticate = (req, res, next)=>{
        const token = req.header("auth-token");
        if (!token) {
          return res.status(401).send({ message: "Please login", isLoggedIn: false });
        }
      
        try {
          const data = jwt.verify(token, process.env.JWT_SECRET);
          req.mongoId = data.id;
          next();
        } catch (err) {      
          res.status(401).send({ message: "Unable to process", isLoggedIn: false });
        }
}

module.exports = authenticate