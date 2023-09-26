import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const API_URL = "https://rickandmortyapi.com/api";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/", async (req,res) => {
try {
    const type = req.body.type;
    const id = req.body.id;
    const result = await axios.get(API_URL + `/${type}/${id}`)
    res.render("index.ejs", { 
      name: result.data.name,
      type: result.data.type,
      dimension: result.data.dimension,
      air_date: result.data.air_date,
      status: result.data.status,
      species: result.data.species,
      gender :result.data.gender,
      image: result.data.image,
      });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No results that match your criteria.",
    });
    
  }
}); 

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});