import {Menuitem} from "../domain/menuitem";

export class MenuitemService {
    constructor() {
    }

    async getMenuitems() {
        const response = await fetch("http://localhost:8080/menuitem");
        const responseJson = await response.json();
        return responseJson.map(menuitem => new Menuitem(menuitem.name, menuitem.id, menuitem.pictureURI, menuitem.price));
    }

    async editMenuItem(id, menuitemName, locationId, menuitemPrice, features){
        const data = { id: id, name: menuitemName, locationId: locationId, price: menuitemPrice, features: features};
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

    async postMenuitem(menuitem, image) {


        const data = new FormData();
        data.append('image',image)
        data.append('price',menuitem.price)
        data.append('locationId',menuitem.locationId)
        data.append('features', menuitem.features)
        data.append('name',menuitem.name)


        const response = await fetch('http://localhost:8080/menuitem', {
            method: 'POST',
            body: data
        });

        return await response.json();
    }

}