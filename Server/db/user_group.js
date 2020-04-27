module.exports = {
    groups: [
        {
            id: 1, 
            name: "Admin group",
            type: "administrator"
        },
        {
            id: 2, 
            name: "User group",
            type: "user"
        },
    ],
    users: [
        {
            id: 1,
            username: "admin",
            password: "admin",
            group_id: 1
        },
        {
            id: 2,
            username: "user1",
            password: "123456",
            group_id: 2
        }
    ]
};