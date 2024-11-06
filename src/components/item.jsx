import ItemService from "../services/item-service";
import { useState, useEffect } from "react";
import withRouter from "../common/router";
import "./item.css";
function Item(props) {
  const [currentItem, setCurrentItem] = useState({
    id: null,
    name: "",
    description: "",
    published: false,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(props.params.id, 122222);
    const id = props.params.id;
    getItem(id);
  }, [props.params.id]);

  const getItem = (id) => {
    ItemService.get(id)
      .then((response) => {
        console.log(response.data, 111111);
        setCurrentItem(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setCurrentItem({ ...currentItem, title });
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentItem({ ...currentItem, description });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentItem.id,
      title: currentItem.title,
      description: currentItem.description,
      published: status,
    };
    ItemService.update(currentItem.id, data)
      .then((response) => {
        setCurrentItem({ ...currentItem, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteItem = () => {
    ItemService.delete(currentItem.id)
      .then((response) => {
        props.history.push("/items");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateItem = () => {
    ItemService.update(currentItem.id, currentItem).then((response) => {
      setMessage("The item was updated successfully!");
    });
  };

  return (
    <div>
      {currentItem ? (
        <div className="edit-form">
          <h4>Item</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentItem.name}
                onChange={onChangeTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentItem.description}
                onChange={onChangeDescription}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentItem.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentItem.published ? (
            <button className="mr-2" onClick={() => updatePublished(false)}>
              UnPublish
            </button>
          ) : (
            <button className="edit-button mr-11" onClick={() => updatePublished(true)}>
              Publish
            </button>
          )}

          <button className="edit-button mr-10" onClick={deleteItem}>
            Delete
          </button>

          <button
            type="submit"
            className="edit-button"
            onClick={updateItem}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
}

export default withRouter(Item);
