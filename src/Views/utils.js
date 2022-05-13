export default class utils {
    static query(query) {
        const URL = "http://localhost:8080/graphql";
        const fetchOptions = {
            method: "POST",
            body: JSON.stringify({query: query}),
            headers: {
                "content-type": "application-json",
                //"authorization": "Bearer " + window.sessionStorage.getItem("myJWT")
            }
        }
        return fetch(URL, fetchOptions)
            .then(response => response.ok ? response.json() : this.throwError(response.message))
            .catch(error => console.log(error));
    }

    static throwError(message) {
        throw new Error(message)
    }
}
