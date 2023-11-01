import api from '@/app/services/api'

export default function postaEscolhas(opcaoSelecionadaParaBack: any) {
    console.log(opcaoSelecionadaParaBack)
    return new Promise((resolve, reject) => {

        api.post('inicioQuestionario', opcaoSelecionadaParaBack)
            .then((sucess) => {
                resolve(sucess.data);
                console.log(sucess)
            })
            .catch((err) => {
                reject(err)
            })
    }
    )
}