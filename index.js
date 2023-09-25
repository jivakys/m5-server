const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/userRoutes");
const { empRouter } = require("./routes/empRoutes");
const app = express();
app.use(express.json());
require("dotenv").config();

app.use("/api", userRouter);
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
