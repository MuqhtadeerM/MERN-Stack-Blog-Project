const express = require("express");
const cors = require("cors");
const blogRouter = require("./route/blog-route");

require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(10000, () => console.log(`App is running at 5000...`));

// const serverless = require("serverless-http");
// module.exports = serverless(app);
