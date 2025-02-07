const router = require('express').Router();
const verify = require('./verifyToken');

module.exports = router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'My first post',
            description: "random data you should not access"
        }
    })
});
