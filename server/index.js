require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

// router

const authRouter = require("./routes/auth");
app.use("/api/v1/auth", authRouter);

// connect
const connectDB = require("./db/connect");

const port = process.env.PORT || 5173;

const start = async () => {
  console.log("this time");
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
