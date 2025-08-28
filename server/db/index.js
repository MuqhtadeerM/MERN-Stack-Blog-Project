const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://muhammedmuzawar9_db_user:Muqhtadeer1234@cluster0.ftm5oxa.mongodb.net/"
  )
  .then(() => console.log("Connected Mongo db"))
  .catch((e) => console.error(e));
