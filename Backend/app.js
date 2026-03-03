import "./config/env.js";
import express from 'express'
import cors from 'cors'
import connectdb from './config/db.js'
import authRoute from './routes/authRoute.js'
import cookieParser from 'cookie-parser'
import profileRoute from './routes/profileRoute.js'
import jobsRoute from './routes/jobsRoute.js'
import adminRoute from './routes/adminRoute.js'
import path from "path";
import uploadRoute from './routes/uploadRoute.js'
console.log("DIR:", process.cwd());
console.log(Object.keys(process.env));

const port = process.env.PORT || 3000

const app = express()
app.use(cookieParser("secret-key"));

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static(path.join("uploads")));

await connectdb()

app.use('/auth',authRoute)
app.use('/profile',profileRoute)
app.use('/Jobs',jobsRoute)
app.use('/admin',adminRoute)
app.use('/file',uploadRoute)



app.listen(port,() => {
    console.log(`Server is running on Port ${port}`)
})