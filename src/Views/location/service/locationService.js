import {Location} from "../domain/location";

export class LocationService {
    constructor() {
    }

    postLocation(location) {
        fetch('http://localhost:8080/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(location),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    editLocation(id, location){
        const data = { id: id, name: location};
        fetch('http://localhost:8080/location', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    async getLocations() {
        const response = await fetch("http://localhost:8080/location");
        const responseJson = await response.json();
        return responseJson.map(location => new Location(location.name));

    }
}