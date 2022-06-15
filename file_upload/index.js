const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// //View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        //uploads is the Upload_folder_name
        cb(null, './uploads')
    },

    filename: (req, file, cb) => {
        let fn = file.originalname.split(path.extname(file.originalname))[0] + ''  + path.extname(file.originalname);
       cb(null, fn);
    }
})

var upload = multer({
        storage:storage
     
    }).single('myfile')

app.get("/", (req,res, next) => {
    res.render("file_upload");
});

app.post("/upload", (req,res) => {
    

    upload(req, res, (err) => {
    if(err instanceof multer.MulterError){
        return res.send({error:true, message:'A Multer error occurred when uploading'})
    }
    else if(err){
        return res.send({error:true, message:'An unknown error occurred when uploading.'})
    }else{

        response = {
            message:'File Uploaded Successfully!',
            filename: req.file.originalname,
            path: req.file.path
        }
       
        console.log(JSON.stringify(response))
        console.log('File Upload Successfully..')
      
      
        res.status(200).send( {
            message:'File Uploaded Successfully!',
            filename: req.file.originalname,
            path: req.file.path
        })
        
     }
    })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  
    console.log("Server Listenong on Port: ", port);
})