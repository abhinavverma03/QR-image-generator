import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var url = "";

app.get("/", (req,res)=>{
    res.render("index.ejs");
})
app.post("/submit",(req,res)=>{
    url = req.body["url"];
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream('public/qr_img.png'));
    res.render("index.ejs",{
        image: "public/qr_img.png"
    })
})
app.listen(port,()=>{
    console.log(`Listening to port ${port}...`)
})