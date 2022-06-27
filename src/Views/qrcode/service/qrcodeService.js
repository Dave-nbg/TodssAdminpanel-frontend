export class qrcodeService {
    async createQr(tableNumber) {

        const response = (await fetch("http://localhost:8080/qr/"+tableNumber, {
            method: 'POST',
        }))
        return await response.json()
    }

    
}
