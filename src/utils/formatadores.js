import moment from 'moment'

export const formataData = (data) => {
    let dataFormatada = '-'

    if (data && typeof (data.getDate) === 'function') {
        let dia = `${data.getDate() > 9 ? data.getDate() : `0${data.getDate()}`}`
        let mes = `${(data.getMonth() + 1) > 9 ? data.getMonth() + 1 : `0${data.getMonth() + 1}`}`
        let ano = `${data.getFullYear()}`
        dataFormatada = `${dia}/${mes}/${ano}`
    } else {
        if (data !== null) {
            let novaData = new Date(data)
            if(moment(novaData).isValid()){
                let dia = `${novaData.getDate() > 9 ? novaData.getDate() : `0${novaData.getDate()}`}`
                let mes = `${(novaData.getMonth() + 1) > 9 ? novaData.getMonth() + 1 : `0${novaData.getMonth() + 1}`}`
                let ano = `${novaData.getFullYear()}`
                dataFormatada = `${dia}/${mes}/${ano}`
            }            
        }
    }

    return dataFormatada
}

export const formataCpf = (cpf) => {
    let cpfFormatado = '-'

    if (cpf.length === 11) {
        let digitosIniciais = cpf.slice(0, 3)
        let digitosSecundarios = cpf.slice(3, 6)
        let digitosTerciarios = cpf.slice(6, 9)
        let digitosFinais = cpf.slice(9, 11)

        cpfFormatado = `${digitosIniciais}.${digitosSecundarios}.${digitosTerciarios}-${digitosFinais}`
    }

    return cpfFormatado
}

export const formataClassificacaoIndicativa = (classificacao) => {
    let classificacaoFormatada = '-'

    if(classificacao === 0){
        classificacaoFormatada = 'Livre'
    }else{
        classificacaoFormatada = `${classificacao}+`
    }

    return classificacaoFormatada
}

export const formataNomeCliente = (idCliente, clientes) => {
    let nomeCliente = '-'

    let filtro = clientes.filter((cliente) => cliente.idCliente === idCliente)

    if(filtro.length>0){
        nomeCliente = filtro[0].nome
    }else{
        nomeCliente = 'Cliente indisponível'
    }

    return nomeCliente
}

export const formataNomeFilme = (idFilme, filmes) => {
    let nomeFilme = '-'

    let filtro = filmes.filter((filme) => filme.idFilme === idFilme)

    if(filtro.length>0){
        nomeFilme = filtro[0].nome
    }else{
        nomeFilme = 'Filme indisponível'
    }

    return nomeFilme
}