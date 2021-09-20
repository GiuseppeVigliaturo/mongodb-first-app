const app = require("express");
const { MongoClient } = require("mongodb");
const dbUri ='stringa connessione';
const mongoClient = new MongoClient(dbUri, {useUnifiedTopology:true})
let blogDB,articoliCollection;

//mongoClient.connect() ritorna una promise
async function run() {
    await mongoClient.connect();
    console.log('Siamo connessi A Mongodb Atlas');
    app.listen(3000, ()=> console.log('Server in Ascolto sulla porta 3000'));
    // blogDB = mongoClient.db('blog');
    // articoliCollection = blogDB.collection('articoli');
}
//Create 
app.get('/nuovo-articolo', (req,res) => {});
//Read
app.get('/articolo', (req,res) => {});
//Update
app.get('/modifica-articolo', (req,res) => {});
//Delete
app.get('/cancella-articolo', (req,res) => {});

//gestione errori
run().catch(err => console.log('Errore connessione' + err));
