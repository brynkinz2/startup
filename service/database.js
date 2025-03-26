const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');



const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('chorechum');
const userCollection = db.collection('user');
const eventCollection = db.collection('event');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log(`Connect to database`);
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

function getUser(username) {
    console.log("Got here");
    return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function addEvent(event) {
    console.log("Trying to add");
    return eventCollection.insertOne(event);
}

function getUserEvents(user) {
    // If user is a string (username), use that directly
    const username = typeof user === 'string' ? user : user.username;

    const events = eventCollection.find({ userID: username }).toArray();
    return events;
}

async function addFriend(user, friendUsername) {
    const result = await userCollection.updateOne(
        { username: user},  // Find the user by username
        { $push: { friendsList: friendUsername } } // Push the friend's username to the friendsList
    );
    const result2 = await userCollection.updateOne(
        { username: friendUsername },  // Find the user by username
        { $push: { friendsList: user } } // Push the friend's username to the friendsList
    );
    return result.modifiedCount > 0;
}

async function getUserFriends(username) {
    // Ensure username is a string
    if (typeof username !== 'string') {
        throw new Error('Username must be a string');
    }

    // Fetch the user from the database
    const user = await userCollection.findOne(
        {username: username},
        {projection: {friendsList: 1}} // Only retrieve the friendsList
    );

    // Return the friendsList or an empty array if no user found
    return user ? (user.friendsList || []) : [];
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addEvent,
    getUserEvents,
    addFriend,
    getUserFriends,
};