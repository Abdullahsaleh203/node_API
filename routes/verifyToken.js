import { verify as _verify } from 'jsonwebtoken';


export default function verifyToken(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verify = _verify(token, process.env.TOKEN_SECRET);
        req.user = verify;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}
