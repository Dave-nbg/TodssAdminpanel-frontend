import {Category} from "../../category/domain/Category";

export class qrcodeService {
    async createQr(tableNumber) {

        const response = (await fetch("http://localhost:8080/qr/"+tableNumber, {
            method: 'POST',
        }))
        return await response.json()
    }

    async getQr(uuid) {
        const response = await fetch("http://localhost:8080/qr/"+uuid);
        return await response.text();
    }
}
