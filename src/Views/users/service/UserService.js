import {User} from "../domain/User";

export class UserService {

    base_url = "http://localhost:8080";

    async getUsers() {
        const response = await fetch("http://localhost:8080/user");
        const responseJson = await response.json();

        return responseJson.map(user => new User(user.username));
    }

    async deleteUser(username) {
        const response = await fetch(this.base_url + "/user", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(username)
        });
        return await response.json();
    }

    async createUser(user) {

        const data = { username: user.username, password: user.password };

        const response = await fetch(this.base_url + "/register", {
           method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
           body: JSON.stringify(data)
        });

        return await response.json();
    }
}