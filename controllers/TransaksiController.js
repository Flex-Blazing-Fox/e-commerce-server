const axios = require('axios')
const apiKey = process.env.RAJA_ONGKIR_API_KEY

class TransaksiController {
    static getProvince(req, res) {

        axios({
            method: 'GET',
            url: 'https://api.rajaongkir.com/starter/province',
            headers: {key: apiKey}
        })
            .then(({data}) => {
                console.log(data.results)
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getCity(){

    }

    static shippingCost(){
        
    }
}

module.exports = TransaksiController