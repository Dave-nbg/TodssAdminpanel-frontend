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
        console.log(responseJson);
        return responseJson.map(category => new Category(category.name, category.description));
    }
}