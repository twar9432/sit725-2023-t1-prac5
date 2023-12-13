const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin2@cluster0.l9hmwv8.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

client.connect(err => {
  if(err) {
    console.log('Database connection error', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

module.exports = client;