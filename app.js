const express = require("express");
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors())
/* MiddleWare */
app.use(express.json());
app.use(morgan('tiny'));
// app.use(authJwt());
 app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
// app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);

// const productSchema = mongoose.Schema({
//     name:String,
//     image:String,
//     countInStock:Number
// })
// const Product = mongoose.model("Product",productSchema)

// app.get(`${api}/list/products`, async (req,res) =>{
//     const productList = await Product.find();
//     if(!productlist){
//         res.status(500).json({
//             success:false
//         })
//     }
//     res.send(productList);
    
// })


// app.post(`${api}/product`, (req,res) =>{
//     const product = new Product({
//         name:req.body.name,
//         image:req.body.image,
//         countInStock:req.body.countInStock
//     })
//     product.save().then((createdProduct)=>{
//         res.status(201).json(createdProduct)
//     }).catch((err)=>{
//         res.status(500).json({
//             error:err,
//             success:false
//         })
//     })
    
// })
    

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DATABASE CONNECTED SUCCESSFULLY"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// port
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

//productionn
// var server = app.listen(process.env.PORT || 3000, function () {
//       var port = server.address().port;
//       console.log("Express is Working on Port" + port)
// })