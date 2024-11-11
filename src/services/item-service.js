import http from "../http-common";
import { mockItems } from "../assets/mock";

class ItemService {
    getAll() {
        // return http.get("/items/all");
        return Promise.resolve({ data: mockItems });
    }
    get(id) {
        // return http.get(`/items/${id}`);
        return Promise.resolve({ data: mockItems.find((item) => item.id == id) });
    }
    create(data) {
        return http.post("/items", data);
    }
    update(id, data) {
        return http.put(`/items/${id}`, data);
    }
    delete(id) {
        return http.delete(`/items/${id}`);
    }
    deleteAll() {
        return http.delete("/items");
    }
    findByName(name) {
        return http.get(`/items?name=${name}`);
    }
}

export default new ItemService();

