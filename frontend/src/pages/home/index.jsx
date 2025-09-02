import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function fetchListOfBlogs() {
    setPending(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs`);
      const result = await response.data;

      if (result && result.blogList && result.blogList.length) {
        setBlogList(result.blogList);
      } else {
        setBlogList([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogList([]);
    } finally {
      setPending(false);
    }
  }

  async function handleDeleteBlog(getCurrentId) {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/blogs/delete/${getCurrentId}`
      );
      const result = await response.data;

      if (result?.message) {
        fetchListOfBlogs();
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }

  function handleEdit(getCurrentBlogItem) {
    console.log(getCurrentBlogItem);
    navigate("/add-blog", { state: { getCurrentBlogItem } });
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading Blogs ! Please wait</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div key={blogItem._id}>
                <p>{blogItem.title}</p>
                <p>{blogItem.description}</p>
                <FaEdit onClick={() => handleEdit(blogItem)} size={30} />
                <FaTrash
                  onClick={() => handleDeleteBlog(blogItem._id)}
                  size={30}
                />
              </div>
            ))
          ) : (
            <h3>No Blogs Added</h3>
          )}
        </div>
      )}
    </div>
  );
}
