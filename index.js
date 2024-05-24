import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { ChangeDateFormat, DateYearFirst } from "../Capstone Project PublicAPI/scripts/script.js";

const app = express();
const port = 3000;

// Il seguente middleware è utilizzato per impostare la directory con file statici
// https://expressjs.com/en/starter/static-files.html#serving-static-files-in-express
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", async (req,res)=>{
    res.render("index.ejs")
})

app.post("/", async (req,res) =>{
    try {
        const departure = req.body.from;
        console.log(departure);
        const destination = req.body.to;
        console.log(destination);
        const date = DateYearFirst(req.body.date);
        console.log(date);
        // Query nell'url dell'API
        const response = await axios.get("http://transport.opendata.ch/v1/connections?from="+departure+
        "&to="+destination+"&datetime="+date);
        console.log("http://transport.opendata.ch/v1/connections?from="+departure+
        "&to="+destination+"&datetime="+date)
        const result = response.data; 
        
        // Cambio del formato della data
        result.connections.forEach(connection => {
            connection.from.departure = ChangeDateFormat(connection.from.departure);
            connection.to.arrival = ChangeDateFormat(connection.to.arrival);
        });
        
        res.render("index.ejs",{
            data : result,
            from : departure,
            to : destination,
            time : date
        })
    } catch (error) {
        res.render("index.ejs", {
            error: "Failed to set the journey"
        })
    }
})

app.post("/clear-fields", (req, res) =>{
    res.redirect("/"); // Reindirizza alla pagina principale dopo aver eseguito l'azione
});


app.listen(port, () =>{
    console.log("Listening on port: "+port);
})