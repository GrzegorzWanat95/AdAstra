// Wymagane pakiety
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')

// Inicjacja aplikacji Express
const app = express();

// Ustawienie portu dla aplikacji
const PORT = process.env.PORT || 3000;

// Ustawienie adresu URL dla bazy danych MongoDB
const DB_URI = process.env.DB_URI;

// Połączenie z bazą danych MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to the database!"));


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session(
    {secret:"key",
     saveUninitialized:true,
      resave:false,}))
app.use((req, res, next)=>{
    res.locals.message= req.session.message;
    delete req.session.message;
    next();
})


app.use(express.static("uploads"));
//templete engine 
app.set('view engine', 'ejs');



app.use("", require("./routes/routes"))

// Start serwera HTTP
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});