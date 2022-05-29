import {Menuitem} from "../domain/menuitem";

export class MenuitemService {
    constructor() {
    }

    async getMenuitems() {
        const response = await fetch("http://localhost:8080/menuitem");
        const responseJson = await response.json();
        return responseJson.map(menuitem => new Menuitem(menuitem.name, menuitem.id, menuitem.pictureURI));
    }
}