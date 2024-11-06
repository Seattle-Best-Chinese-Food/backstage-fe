import { useState } from "react";
import ItemService from "../services/item-service";
import "./add-item.css";

function AddItem() {
  const [item, setItem] = useState({
    id: null,
    name: "",
    description: "",
    published: false,
    submitted: false,
  });

  const onChangeName = (e) => {
    const name = e.target.value;
    setItem({ ...item, name: name });
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setItem({ ...item, description: description });
  };

  const saveItem = () => {
    const data = { name: item.name, description: item.description };
    ItemService.create(data).then((response) => {
      setItem({
        id: response.data.id,
        name: response.data.name,
        description: response.data.description,
      });
    });
  };
  const creatNewItem = () => {
    setItem({
      id: null,
      name: "",
      description: "",
      published: false,
      submitted: false,
    });
  };

  return (
    <div className="submit-form">
      {item.submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={creatNewItem}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={item.name}
              onChange={onChangeName}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={item.description}
              onChange={onChangeDescription}
              name="description"
            />
          </div>

          <button onClick={saveItem} className="btn btn-success mt-3">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default AddItem;
