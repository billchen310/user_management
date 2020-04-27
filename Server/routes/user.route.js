module.exports = function(db){
    "use strict";
    const express = require('express');
    const bodyParser = require('body-parser');
    const Router = express.Router;
    const userRouter = new Router();
    const cors = require('cors');
    const default_password = "123456";

    userRouter.use(cors());
    userRouter.use(bodyParser.urlencoded({limit: '50m', extended: false}));
    userRouter.use(bodyParser.json({limit: '50m'}));

    userRouter.get('/newUserId', (req, res) => {
        let existing_ids = db.users.map((user) => user.id);
        let new_id = Math.max(...existing_ids) + 1;
        res.status(200).json({new_id});
    });
    
    userRouter.get('/getByGroup/:group_id', (req, res) => {
        let group_id = parseInt(req.params.group_id);
        let target_users = db.users.filter((user) => user.group_id === group_id);
        res.status(200).json(target_users);
    });

    userRouter.put('/update', (req, res) => {
        let user_id = parseInt(req.body.id);
        let new_name = req.body.new_name;
        let new_group_id = parseInt(req.body.new_group_id);
        let duplicated_user = db.users.find((user) => user.id !== user_id && user.username.toLowerCase() === new_name.toLowerCase());
        if (duplicated_user){
            res.status(200).json({
                success: false,
                message: "Failed to update, the user with same username already exists."
            });
        } else {
            let target_user = db.users.find((user) => user.id === user_id);
            let current_group_id = target_user.group_id;
            if (target_user){
                Object.assign(target_user, {username: new_name, group_id : new_group_id});
            }
            let remaining_uses = db.users.filter((x) => x.group_id === current_group_id);
            res.status(200).json({
                success: true,
                users: remaining_uses,
                message: "Updated user successfully."
            });
        }
    });

    userRouter.post('/add', (req, res) => {
        let id = parseInt(req.body.id);
        let username = req.body.name;
        let group_id = req.body.group_id;
        let duplicated_user = db.users.find((user) => user.username.toLowerCase() === username.toLowerCase());
        if (duplicated_user){
            res.status(200).json({
                success: false,
                message: "The user with same username already exists."
            });
        } else {
            let new_user = {id, username, password: default_password, group_id};
            db.users.push(new_user);
            res.status(200).json({
                success: true,
                users: db.users.filter((x) => x.group_id === group_id),
                new_user,
                message: "Added new group successfully."
            })
        }
    });

    userRouter.delete('/remove/:id/:group_id', (req, res) => {
        let id = parseInt(req.params.id);
        let group_id = parseInt(req.params.group_id);
        db.users = db.users.filter((user) => user.id !== id);
        res.status(200).json({
            success: true,
            users: db.users.filter((x) => x.group_id === group_id),
            message: "Deleted user successfully."
        })
    });

    return userRouter;
}