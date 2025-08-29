const express = require("express");

const blogRouter = express.Router();

const {
  fetchBlog,
  addNewBlog,
  updateABlog,
  deleteBlog,
} = require("../controller/blog-controller");

blogRouter.get("/", fetchBlog);
blogRouter.post("/add", addNewBlog);
blogRouter.put("/:id", updateABlog);
blogRouter.delete("/delete/:id", deleteBlog);

module.exports = blogRouter;
