import {Category} from "../domain/Category";

export class CategoryService {
    async createCategory(category,image) {
        const data = new FormData();
        data.append('name',category.name);
        data.append('description',category.description);
        data.append('image',image)

        const response = (await fetch("http://localhost:8080/category", {
            method: 'POST',
            body: data
        }))
        return await response.json()
    }

    async getCategories() {
        const response = await fetch("http://localhost:8080/category");
        const responseJson = await response.json();

        return responseJson.map(category => new Category(category.id, category.name, category.description));
    }

    async deleteCategory(id) {
        const response = await fetch('http://localhost:8080/category/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();

    }
}