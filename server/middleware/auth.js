import jwt from 'jsonwebtoken';

// auth middleware that is checked before performing actions
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];   // get the token
        const isCustomAuth = token.length < 500;   // if token legth < 500 then it is jwt token else if lebth is > 500 then it is googleOath token
        let decodedData;  // data that we want to get from the token itself i.e. username and id of that person
        // for jwt token 
        if(token && isCustomAuth)
        {
            decodedData = jwt.verify(token, 'test'); // we will get the username and id of the person who is currently logged in
            req.userId = decodedData?.id;  // get the id of user
        }
        // for google oauth token
        else 
        {
            decodedData = jwt.decode(token); // here, no need to pass 'test' as a secret key
            req.userId = decodedData?.sub;  // 'sub' is the name given by google for id to differentiate each individual's id
        }
        next();  // calling next to go on to next middleware/task
    } catch (error) {
        console.log(error);
    }
}

export default auth;