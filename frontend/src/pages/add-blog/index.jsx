import { useContext } from "react";
import axios from "axios";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";

export default function AddNewBlog() {
  const { formData, setFormData } = useContext(GlobalContext);
  const navigate = useNavigate();

  console.log(formData);

  const handleSaveBlogToDatabase = async () => {
    const response = await axios.post("http://localhost:5000/api/blogs/add", {
      title: formData.title,
      description: formData.description,
    });

    const result = await response.data;
    console.log(result);

    if (result) {
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  };

  return (
    <div className={classes.wrapper}>
      <h1>Add a Blog</h1>

      <div className={classes.formWrapper}>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          name="title"
          placeholder="Enter Blog Title"
        />
        <textarea
          id="description"
          name="description"
          placeholder="Enter Blog Description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
        />
        <button onClick={handleSaveBlogToDatabase}>Add Blog</button>
      </div>
    </div>
  );
}
