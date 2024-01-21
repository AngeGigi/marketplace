import cors from 'cors';
import express from "express";
import multer from 'multer';
import bodyParser from 'body-parser';
import mysql from "mysql";
import path from 'path'

const app = express()

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "loopmarket"
})

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./public/images")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now()+ path.extname(file.originalname))
    }
});

const upload = multer({storage: storage});
const adminupload = multer({storage: storage});

app.post("/crochet", adminupload.single)


app.get("/upload", (req,res)=>{
    res.render("upload");
})

app.post("/upload", upload.single("image"), (req,res) =>{
    res.send("Image Uploaded")
})

app.get("/", (req, res)=>{
    res.json("Checked")
})

app.get('/crochet',(req, res)=>{
    const q = "SELECT * FROM crochet";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data)
    });
});

app.post('/addcrochet', upload.single('image'), (req, res) => {
    const q = "INSERT INTO crochet (crochet_name, crochet_deets, image, price) VALUE (?)";
    const values = [
        req.body.crochet_name,
        req.body.crochet_deets,
        req.file ? req.file.filename: null,
        req.body.price,
    ];

    console.log(values);

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

/*app.post('/add/acrochet', upload.single('image'), (req, res) =>{
    const {crochet_name, crochet_deets, image, price} = req.body;
    const sql = 'INSERT INTO items (crochet_name, crochet_deets, image, price) VALUES (?,?)';
    db.query(sql, [crochet_name, crochet_deets, image, price]), (err, result) =>{
        if(err){
            console.error('Error adding item to database', err);
            res.status(500).send('Error adding item to database');
        } else{
            console.log('Item added suucessfully');
            res.status(200).send('Item added suucessfully');
        }
    }
})*/

app.post("/adminuser", (res,req) =>{
    console.log("Received login request:", req.body);
    const { uname, pword} = req.body;

    const q = "SELECT * FROM adminuser WHERE username =? AND password =?";
    db.query(q, [uname, pword], (error, results)=>{
        if(error){
            console.error('Error executing MSQL query:', error);
            res.status(500).json({success:false, message:'Internal Server Error'});
        } else {
            if (results.length > 0){
                res.json({success:true, message:'Authentication successful'});
            } else{
                res.json({success:false, message:'Invalid credentials'});
            }
        }
    });

});



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
    const d =req.params.id;
    const q = "UPDATE crochet SET `crochet_name` =?, `crochet_deets` =?, `image` = ?, `price` =? WHERE id =?";

    const values =[
        req.body.crochet_name,
        req.body.crochet_deets,
        req.body.image,
        req.body.price,
        idcrochet,
    ];

    db.query(q,[...values, d], (err, data) => {
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