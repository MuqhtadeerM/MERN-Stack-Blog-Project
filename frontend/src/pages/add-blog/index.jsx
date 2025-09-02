import { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddNewBlog() {
  const { formData, setFormData, setIsEdit, isEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  async function handleSaveBlogToDatabase() {
    try {
      const response = isEdit
        ? await axios.put(
            `${API_BASE_URL}/blogs/update/${location.state.getCurrentBlogItem._id}`,
            {
              title: formData.title,
              description: formData.description,
            }
          )
        : await axios.post(`${API_BASE_URL}/blogs/add`, {
            title: formData.title,
            description: formData.description,
          });

      const result = response.data;

      if (result) {
        setIsEdit(false);
        setFormData({
          title: "",
          description: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  }

  useEffect(() => {
    if (location.state) {
      const { getCurrentBlogItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description,
      });
    }
  }, [location]);

  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit a Blog" : "Add a Blog"}</h1>
      <div className={classes.formWrapper}>
        <input
          name="title"
          placeholder="Enter Blog Title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          placeholder="Enter Blog Description"
          id="description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
        />
        <button onClick={handleSaveBlogToDatabase}>
          {isEdit ? "Edit Blog" : "Add Blog"}
        </button>
      </div>
    </div>
  );
}
