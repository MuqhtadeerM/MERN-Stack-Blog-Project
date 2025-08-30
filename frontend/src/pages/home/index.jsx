import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";

import axios from "axios";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);

  const fetchListBlog = async () => {
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.json();
    console.log(result);
  };

  useEffect(() => {
    fetchListBlog();
  }, []);
  return (
    <div>
      <h1>Blog List</h1>
    </div>
  );
}
