
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";

import AddItem from "./components/add-item";
import ItemList from "./components/item-list";
import Item from "./components/item";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/items"} className="navbar-brand">
          Best Chinese Food
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/items"} className="nav-link">
              items
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ItemList/>} />
            <Route path="/items" element={<ItemList/>} />
            <Route path="/add" element={<AddItem/>} />
            <Route path="/items/:id" element={<Item/>} />
          </Routes>
        </div>
    </>
  );
}

export default App;
