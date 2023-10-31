import api from '@/app/services/api'

export default function postMensagemInicial({ mensagemInicial }: any) {

    return new Promise((resolve, reject) => {

        api.post('teste', mensagemInicial)
            .then((sucess) => {
                resolve(sucess.data);
            })
            .catch((err) => {
                reject(err)
            })
    }
    )
}