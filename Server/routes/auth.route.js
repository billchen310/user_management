module.exports = function(db){
    "use strict";
    const express = require('express');
    const bodyParser = require('body-parser');
    const Router = express.Router;
    const authRouter = new Router();
    const cors = require('cors');

    authRouter.use(cors());
    authRouter.use(bodyParser.urlencoded({limit: '50m', extended: false}));
    authRouter.use(bodyParser.json({limit: '50m'}));

    authRouter.post('/login', (req, res) => {
        let users = db.users;
        let login_username = req.body.username;
        let login_password = req.body.password;
        let target_user = users.find((user) => 
                                user.username === login_username && 
                                user.password === login_password);
        if (target_user){
            let target_group = db.groups.find((group) => group.id === target_user.group_id);
            target_user.type = target_group.type;
            res.status(200).json({
                user: target_user,
                success: true,
                message: 'Login successfully.'
            })
        } else {
            res.status(200).json({
                success: false,
                message: 'Login failed, username or password is invalid.'
            })
        }
    });

    return authRouter;
}