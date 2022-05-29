import {Menuitem} from "../domain/menuitem";

export class MenuitemService {
    constructor() {
    }

    async getMenuitems() {
        const response = await fetch("http://localhost:8080/menuitem");
        const responseJson = await response.json();
        return responseJson.map(menuitem => new Menuitem(menuitem.name, menuitem.id, menuitem.pictureURI));
    }

    async editMenuItem(id, menuitemName){
        const data = { id: id, name: menuitemName};
        const response = await fetch('http://localhost:8080/menuitem', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        return await response.json();
    }

    async deleteMenuItem(id) {
        const response = await fetch('http://localhost:8080/menuitem/'+id , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return await response.json();
    }
}