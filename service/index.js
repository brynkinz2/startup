const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const {getUserEvents, getUserFriends} = require("./database");
const res = require("express/lib/response");

const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let events = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.username, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ username: user.username });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        console.log("userFound");
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            res.send({ username: user.username });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

// create a new event
// apiRouter.post('/events/create', verifyAuth, async (req, res) => {
apiRouter.post('/events/create', async (req, res) => {

    //authenticate the user
    const user = await findUser('username', req.body.username);
    if (user) {
        //validate that the request has all the parts
        const currEvent = {
            title: req.body.eventTitle,
            day: req.body.day,
            time: req.body.time,
            userID: req.body.username,
        }
        //save it into the events table
        events.push(currEvent);
        await DB.addEvent(currEvent);
        return;
    }
})

// app.get("/api/events", verifyAuth, (req, res) => {
app.get("/api/events", async (req, res) => {
    const {username} = req.query;
    if (!username) {
        return res.status(400).json({error: "Username is required"});
    }
    // const userEvents = events.filter(event => event.userID === username);
    const userEvents = await DB.getUserEvents(username);
    res.json({"events": userEvents});
})

app.get("/api", (req, res) => {
    res.json({"users" : users});
})

//create new user
async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
        friendsList: [],
    };
    users.push(user);
    await DB.addUser(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    if (field === 'token') {
        console.log('finding token');
        const currUser = DB.getUserByToken(value);
        console.log(currUser);
        return currUser;
    }
    return DB.getUser(value);
}

app.post("/api/user/addFriends", verifyAuth, async (req, res) => {
    try {
        const { username, friendUsername } = req.body;

        // Verify both users exist
        const user = await findUser('username', username);
        const friendUser = await findUser('username', friendUsername);

        if (!friendUser) {
            return res.status(404).json({ error: "Friend user not found" });
        }

        const result = await DB.addFriend(username, friendUsername);

        if (result) {
            res.status(200).json({ message: "Friend added successfully" });
        } else {
            res.status(400).json({ message: "Unable to add friend" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.get("/api/user/friendsList", verifyAuth, async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const friendsList = await DB.getUserFriends(username);
        console.log(friendsList);
        res.json({ friendsList });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
