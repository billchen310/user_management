module.exports = function(db){
    "use strict";
    const express = require('express');
    const bodyParser = require('body-parser');
    const Router = express.Router;
    const groupRouter = new Router();
    const cors = require('cors');

    groupRouter.use(cors());
    groupRouter.use(bodyParser.urlencoded({limit: '50m', extended: false}));
    groupRouter.use(bodyParser.json({limit: '50m'}));

    groupRouter.get('/getAll', (req, res) => {
        res.status(200).json(db.groups);
    });

    groupRouter.put('/update', (req, res) => {
        let group_id = parseInt(req.body.id);
        let new_name = req.body.new_name;
        let duplicated_group = db.groups.find((group) => group.id !== group_id && group.name.toLowerCase() === new_name.toLowerCase());
        if (duplicated_group){
            res.status(200).json({
                success: false,
                message: "Failed to update, the group with same name already exists."
            });
        } else {
            let target_group = db.groups.find((group) => group.id == group_id);
            if (target_group){
                Object.assign(target_group, {name: new_name});
            }
            res.status(200).json({
                success: true,
                groups: db.groups,
                updated_group: target_group,
                message: "Updated group successfully."
            });
        }
    });

    groupRouter.post('/add', (req, res) => {
        let existing_ids = db.groups.map((group) => group.id);
        let id = Math.max(...existing_ids) + 1; 
        let name = req.body.name;
        let duplicated_group = db.groups.find((group) => group.name.toLowerCase() === name.toLowerCase());
        if (duplicated_group){
            res.status(200).json({
                success: false,
                message: "The group with same name already exists."
            });
        } else {
            let new_group = {id, name, type: "user"};
            db.groups.push(new_group);
            res.status(200).json({
                success: true,
                groups: db.groups,
                new_group,
                message: "Added new group successfully."
            });
        }
    });

    groupRouter.delete('/remove/:id', (req, res) => {
        let id = parseInt(req.params.id);
        db.groups = db.groups.filter((group) => group.id !== id);
        db.users = db.users.filter((user) => user.group_id !== id);
        res.status(200).json({
            success: true,
            groups: db.groups,
            users: db.users,
            message: "Deleted group and relevant users successfully."
        })
    });

    return groupRouter;

}