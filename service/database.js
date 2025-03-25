const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
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
    return eventCollection.find({userID: user.username });
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addEvent,
    getUserEvents,
};