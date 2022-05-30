export class MenuitemDTO{
    constructor(name, price, features, locationId, pictureURI) {
        this.name = name;
        this.price = price;
        this.features = features;
        this.locationId = locationId;
        this.pictureURI = pictureURI;
    }
    // "postMenuItemDTO": {
    //     "name": "string",
    //     "price": 0,
    //     "features": {
    //         "additionalProp1": "string",
    //         "additionalProp2": "string",
    //         "additionalProp3": "string"
    //     },
    //     "locationId": 0
    // },
    // "image": "string"
}