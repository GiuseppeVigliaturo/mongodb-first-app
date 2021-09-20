const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const dbUri ='mongodb+srv://Giuseppe:mdb-123@cluster0.hzl8i.mongodb.net/blog?retryWrites=true&w=majority';
const mongoClient = new MongoClient(dbUri, {useUnifiedTopology:true})
let blogDB,articoliCollection;

//mongoClient.connect() ritorna una promise
async function run() {
    await mongoClient.connect();
    console.log('Siamo connessi A Mongodb Atlas');
    app.listen(3000, ()=> console.log('Server in Ascolto sulla porta 3000'));
    //per recuperare il riferimento ad uno specifico db uso sull'istanza mongocliente il metodo db
    blogDB = mongoClient.db('blog');
    //con il metodo collection specifichiamo a quale collezione fare riferimento
    articoliCollection = blogDB.collection('articoli');
}
const query = { "autore": "Turuzzu" };

//Create 
app.get('/nuovo-articolo', async (req,res) => {
    const articoli = [{
        titolo:"titolo articolo 1",
        testo: "testo articolo 1",
        autore: "Giuseppe",
        tag: ["node.js", "javascript", "mongodb"]
    },
    {
        titolo:"titolo articolo 2",
        testo: "testo articolo 2",
        autore: "Pasquale",
        tag: ["node.js", "javascript", "mongodb"]
    },
    {
        titolo:"titolo articolo 2",
        testo: "testo articolo 2",
        autore: "Turuzzu",
        tag: ["node.js", "javascript", "mongodb"]
    },
];
    //l'inserimento di un valore nel db è un'operazione asincrona
    const ris = await articoliCollection.insertMany(articoli);
    //console.log(ris.instertedCount);
    if (ris.insertedCount >= 1) {
        res.send("nuovi articoli inserito");
    }
});

//Read
app.get('/articolo', async (req,res) => {
    //ricerca singolo articolo
    const cerca = await articoliCollection.findOne(query);
    if (cerca) {
        res.send(cerca);
    }

    //ricerca articoli multipli con find()
});
//Update
app.get('/modifica-articolo', (req,res) => {});
//Delete
app.get('/cancella-articolo', (req,res) => {});

//gestione errori
run().catch(err => console.log('Errore connessione' + err));

// app.listen(3000,console.log("connessione avvenuta"));