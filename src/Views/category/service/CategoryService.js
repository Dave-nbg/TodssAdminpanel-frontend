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

    async getCategoryDetails(id) {
        const response = await fetch('http://localhost:8080/category/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    }

    async updateCategory(category) {
        const data = {
            id: category.id,
            name: category.name,
            description: category.description
        }

        const response = (await fetch("http://localhost:8080/category", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }))

        return await response.json()
    }

    async updateCategoryOrder(id, upper) {
        const data = new FormData();
        data.append("upperId", upper);
        data.append("lowerId", id);
        const response = (await fetch("http://localhost:8080/category", {
            method: 'PATCH',
            body: data
        }))

        return await response.json();
    }
}