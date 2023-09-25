const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/userRoutes");
const { empRouter } = require("./routes/empRoutes");
const app = express();
app.use(express.json());
app.use(cors());
// cors
require("dotenv").config();

app.use("/user", userRouter);
app.use("/dashboard", empRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("server running on port " + process.env.PORT);
  } catch (error) {
    console.log(error);
  }
  console.log("DB CONNECTED");
});
