import { Link } from "react-router-dom";
import classes from "./styles.module.css";

export default function Header() {
  return (
    <div className={classes.header}>
      <h3>MERN Blog App</h3>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/add-blog"}>Add Blog</Link>
        </li>
      </ul>
    </div>
  );
}
