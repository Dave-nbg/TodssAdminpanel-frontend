import {Location} from "../domain/location";

export class LocationService {
    constructor() {
    }

    async postLocation(location) {
        const response = await fetch('http://localhost:8080/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(location),
        });

        return await response.json();
    }

    async editLocation(id, location){
        const data = { id: id, name: location};
        const response = await fetch('http://localhost:8080/location', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        return await response.json();
    }

    async deleteLocation(id){
        const response = await fetch('http://localhost:8080/location/'+id , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return await response.json();
    }



    async getLocations() {
        const response = await fetch("http://localhost:8080/location");
        const responseJson = await response.json();
        return responseJson.map(location => new Location(location.name, location.id));
    }
}