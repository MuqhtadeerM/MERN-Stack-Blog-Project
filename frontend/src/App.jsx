import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import AddNewBlog from "./pages/add-blog";
import Home from "./pages/home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-blog" element={<AddNewBlog />} />
        <Route exact path="/edit-blog/:id" element={<AddNewBlog />} />
      </Routes>
    </div>
  );
}

export default App;
