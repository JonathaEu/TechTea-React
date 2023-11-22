import api from '@/app/services/api'

export default function getCalculo() {

    return new Promise((resolve, reject) => {

        api.get('/controla-calculo')
            .then((sucess) => {
                resolve(sucess.data);
            })
            .catch((err) => {
                reject(err)
            })
    })
}