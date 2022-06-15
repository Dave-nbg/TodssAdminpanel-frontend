import {Category} from "../domain/Category";

export class CategoryService {
    async createCategory(data) {
        return (await fetch("http://localhost:8080/category", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        })).json();
    }

    async getCategories() {
        const response = await fetch("http://localhost:8080/category");
        const responseJson = await response.json();
        console.log(responseJson);
        return responseJson.map(category => new Category(category.name, category.description));
    }
}