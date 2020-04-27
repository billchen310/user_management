;(function () {
    "use strict";

    const express = require('express');
    const cors = require('cors');
    const app = express();
    const morgan = require('morgan');
    const db = require('./db/user_group');
    const authRoutes = require('./routes/auth.route.js')(db);
    const groupRoutes = require('./routes/group.route.js')(db);
    const userRoutes = require('./routes/user.route.js')(db);

    const port = 3000;

    app.use(cors());
    app.use(morgan('dev'));
    app.use('/auth', authRoutes);
    app.use('/group', groupRoutes);
    app.use('/user', userRoutes);

    app.listen(port, function () {
        console.log("Server is running on "+ port +" port");
    });

})();