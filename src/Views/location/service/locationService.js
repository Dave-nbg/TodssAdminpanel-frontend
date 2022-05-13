import {Location} from "../domain/location";

export class LocationService {
    constructor() {
    }

    postLocation(location) {
        return utils.query(`
        mutation {
           postSubject(name: "${location.name}"){name}
        }
        `).then(response => {if(response.errors !== undefined){this.throwError(response.message)}})
    }

    async getLocations() {
        const response = await fetch("http://localhost:8080/location");
        const responseJson = await response.json();
        return responseJson.map(location => new Location(location.name));

    }
}