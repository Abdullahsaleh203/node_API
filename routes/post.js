const router = require('express').Router();
import verify from './verifyToken';

export default router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'My first post',
            description: "random data you should not access"
        }
    })
});
