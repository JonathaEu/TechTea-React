import api from '@/app/services/api'

export default function postaEscolhas({ opcaoSelecionada }: any) {
    console.log(opcaoSelecionada)
    return new Promise((resolve, reject) => {

        api.post('inicioQuestionario', opcaoSelecionada)
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