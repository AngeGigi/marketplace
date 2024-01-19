import cors from 'cors';
import express from "express";
import multer from 'multer';
import mysql from "mysql";
import path from 'path'

const app = express()

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "loopmarket"
})

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cd(null, "./public/images")
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now()+ path.extname(file.originalname))
    }
});

const upload = multer({storage: storage})


app.get("/upload", (req,res)=>{
    res.render("upload");
})

app.post("/upload", upload.single("image"), (req,res) =>{
    res.send("Image Uploaded")
})

app.get("/", (req, res)=>{
    res.json("Checked")
})

app.get("/crochet",(req, res)=>{
    const q = "SELECT * FROM crochet";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data)
    });
});

app.post("/add/crochet", upload.single('image'), (req, res) => {
    const q = "INSERT INTO crochet (crochet_name, crochet_deets, image, price) VALUE (?)";
    const values = [
        req.body.crochet_name,
        req.body.crochet_deets,
        req.file ? req.file.filename: null,
        req.body.price,
    ];

    console.log(values)

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})



{/*app.post("/crochet", (req, res)=>{
    const q = "INSERT INTO flower (`crochet_name`, `crochet_deets`,`image`,`price`) VALUES(?)";
    const values =[
        req.body.crochet_name,
        req.body.crochet_deets_deets,
        req.body.image,
        req.body.price,
    ];
    db.query(q,[values], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Successfuly Executed");
    });
});*/}

app.delete("/crochet/:id", (req, res) =>{
    const idcrochet =req.params.id;
    const q = "DELETE FROM crochet WHERE idcrochet =?"
   
    db.query(q,[idcrochet], (error, data)=>{
        if(error) return res.json(error);
        return res.json("Deleted Successfully")
    });
});

app.put("/crochet:id", (req, res) => {
    const idcrochet =req.params.id;
    const q = "UPDATE crochet SET crochet_name =?, crochet_deets =?, price =?, image = ? WHERE id =?";

    const values =[
        req.body.crochet_name,
        req.body.crochet_deets,
        req.body.image,
        idcrochet,
    ];

    db.query(q,values, (err, data) => {

        if(err) return res.json(err);
        return res.json("Update Successfully");

    });
});



app.delete("/crochet/:id", (req, res) => {
    const idcrochet = req.params.id;
    const q = "DELETE FROM crochet WHERE idcrochet = ?";

    db.query(q, [idcrochet], (error, data) => {
        if (error) return res.json(error);
        return res.json("Beans bean deleted successfully");
    });
});

app.listen(8000, ()=>{
    console.log("Connected to backend")
})