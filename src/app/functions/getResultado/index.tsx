import api from '@/app/services/api'

export default function getResultado() {

    return new Promise((resolve, reject) => {

        api.get('/final')
            .then((sucess) => {
                resolve(sucess.data);
            })
            .catch((err) => {
                reject(err)
            })
    })
}