import api from '@/app/services/api'

export default function postaEscolhas(opcaoSelecionadaParaBack: any) {
    return new Promise((resolve, reject) => {

        api.post('/inicioQuestionario', opcaoSelecionadaParaBack)
            .then((sucess) => {
                resolve(sucess.data);
            })
            .catch((err) => {
                reject(err)
            })
    })
}