import { useContext, useEffect } from "react";
import axios from "axios";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function AddNewBlog() {
  const { isEdit, setIsEdit, formData, setFormData } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { _id } = useParams();
  console.log(formData);

  const handleSaveBlogToDatabase = async () => {
    const response = isEdit
      ? await axios.put(
          `/api/blogs/update/${location.state.getCurrentItem._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });

    const result = await response.data;
    console.log(result);

    if (result) {
      setIsEdit(false);
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  };

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { getCurrentItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: getCurrentItem.title,
        description: getCurrentItem.description,
      });
    }
  }, [location]);

  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit Your Blog" : "Add Blog "}</h1>

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
        <button onClick={handleSaveBlogToDatabase}>
          {isEdit ? "Edit Blog" : "Add Blog"}
        </button>
      </div>
    </div>
  );
}
