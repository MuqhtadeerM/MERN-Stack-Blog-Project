import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const fetchListBlog = async () => {
    setPending(true);
    const response = await axios.get("/api/blogs");
    const result = await response.data;

    console.log(result);

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]); // prevent api crashers
    }
  };

  const handleDelete = async (getCurrentId) => {
    const response = await axios.delete(
      `/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;

    if (result?.message) {
      fetchListBlog();
      // navigate(0);
    } else {
      setPending(false);
    }
  };

  const handleEdit = async (getCurrentItem) => {
    console.log(getCurrentItem);
    navigate("/add-blog", { state: { getCurrentItem } });
  };
  useEffect(() => {
    fetchListBlog();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading Blogs...</h1>
      ) : blogList && blogList.length ? (
        <div className={classes.blogListContainer}>
          {blogList.map((blogItem) => (
            <div className={classes.blogItem} key={blogItem._id}>
              <p>{blogItem.title}</p>
              <p>{blogItem.description}</p>
              <FaEdit onClick={() => handleEdit(blogItem)} size={30} />
              <FaTrash onClick={() => handleDelete(blogItem._id)} size={30} />
            </div>
          ))}
        </div>
      ) : (
        <h2>No Blogs Found</h2>
      )}
    </div>
  );
}
