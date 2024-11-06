import { useState, useEffect } from "react";
import ItemService from "../services/item-service";
import { Link } from "react-router-dom";
import "./item-list.css";

function ItemList() {
  const [searchTitle, setSearchTitle] = useState("");
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const retrieveItems = () => {
    ItemService.getAll()
      .then((response) => {
        setItems(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveItems();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const fetchTitleItem = () => {
    ItemService.findByName(searchTitle)
      .then((response) => {
        setItems(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveItem = (item, index) => {
    setCurrentItem(item);
    setCurrentIndex(index);
  };

  const removeAllItems = () => {
    ItemService.removeAll()
      .then((response) => {
        console.log(response.data);
        retrieveItems();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={fetchTitleItem}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Items List</h4>

        <ul className="list-group">
          {items &&
            items.map((item, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveItem(item, index)}
                key={index}
              >
                {item.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllItems}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentItem ? (
          <div className="card">
            <h4>Item</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentItem.name}
            </div>
            <div className="txt-align-j">
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentItem.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentItem.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/items/" + currentItem.id}
              className="edit-button"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Item...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemList;
