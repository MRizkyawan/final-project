const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser')



// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database


// Routes files
const router = require('./routes/index')



const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

// File uploading
app.use(fileupload());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/',router)



const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle unhandeled promise rejections
process.on('unhandleRejection',(err, promise) =>{
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(()=>process.exit(1));
});