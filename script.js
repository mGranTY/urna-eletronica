//Declaração de variaveis base
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

//Variaveis de controle de ambiente
let etapaAtual = 0;
let numero = '';
let brancoEtapa = false;

const comecarEtapa = () => {
    let etapa = etapas[etapaAtual]

    let numeroHTML = ''
    numero = ''
    brancoEtapa = false

    for(let i=0;i<etapa.numeros;i++){
        if (i === 0){
            numeroHTML += '<div class="numeros pisca"></div>'
        } else{
            numeroHTML += '<div class="numeros"></div>'
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = "";
    aviso.style.display = 'none';
    lateral.innerHTML = "";
    numeros.innerHTML = numeroHTML

}

const atualizaInterface = () =>{
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })
    if (candidato.length > 0){
        candidato = candidato[0]
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `NOME: ${candidato.nome}</br> PARTIDO: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHTML = ''
        for(let i in candidato.fotos){
            if (candidato.fotos[i].small){
                fotosHTML += `<div class="d-1-image small"><img src="./images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`

            }else {
                fotosHTML += `<div class="d-1-image"><img src="./images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            }
        }

        lateral.innerHTML = fotosHTML
    } else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'

    }
}

const btnClick = (n) => {
    let elNumero = document.querySelector('.numeros.pisca')
    if (elNumero !== null){
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca')
        }else{
            atualizaInterface()
        }

    }
}

const branco = () => {
    if (numero.length === 0){
        brancoEtapa = true
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    }
}

const corrige = () => {
    comecarEtapa()
}

const confirma = () => {
    let etapa = etapas[etapaAtual]

    let votoConfirmado = false

    if (brancoEtapa){
        votoConfirmado = true;
        console.log('voto em branco registrado')

    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        console.log('voto confirmado no numero:'+ numero)
    }

    if (votoConfirmado === true){
       etapaAtual++
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        }else{
            seuVotoPara.style.display = 'none';
            cargo.innerHTML = ''
            descricao.innerHTML = "";
            aviso.style.display = 'none';
            lateral.innerHTML = "";
            numeros.innerHTML = ''
            descricao.innerHTML = '<div class="aviso--gigante pisca center">FIM</div>'

        }
    }
}

comecarEtapa();
