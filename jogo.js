const sprites = new Image();
sprites.src = './sprites.png';
const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d')
const sompunch = new Audio();
sompunch.src = './som_punch.wav';

let animation_frame = 0;

const flappyBird = {
    spriteX: 0,
    spriteY: 0, 
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    pulo: 4.6,
     pula(){ 
         flappyBird.velocidade = -flappyBird.pulo;
     },
     desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, flappyBird.largura,
            flappyBird.altura, flappyBird.x, flappyBird.y, flappyBird.largura,
            flappyBird.altura,
        );
     }, 
     gravidade: 0.25,
     velocidade: 0,
     movimentos: [
        {spriteX: 0, spriteY: 0,},
        {spriteX: 0, spriteY: 26,},
        {spriteX: 0, spriteY: 52,},
        {spriteX: 0, spriteY: 26,},
     ],
     frameAtual: 0, 

     atualiza(){
        if(fazcolisao()){
            sompunch.play();
            telaativa = telainicio;
            flappyBird.y = 50,
            flappyBird.velocidade = 0
            return;
        }
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
        flappyBird.atualizaFrame();
     },
     atualizaFrame(){
         if((animation_frame % 10) === 0 ){ 
         flappyBird.frameAtual = flappyBird.frameAtual + 1;
         flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
         flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX;
        flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
    }
    },
}

const chao = {
    spriteX: 0,
    spriteY: 608, 
    largura: 224,
    altura: 113,
    x: 0,
    y: 367,
     desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, chao.largura,
            chao.altura, chao.x, chao.y, chao.largura,
            chao.altura,
        );
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, chao.largura,
            chao.altura, chao.x + 224, chao.y, chao.largura,
            chao.altura,
        );
     },
     atualiza() {
         chao.x = chao.x -1;
         chao.x = chao.x % (chao.largura / 2);
         
     }
}

const fundo = {
    spriteX: 390,
    spriteY: 3, 
    largura: 277,
    altura: 204,
    x: 0,
    y: 280,
     desenha() {
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY, fundo.largura,
            fundo.altura, fundo.x, fundo.y, fundo.largura,
            fundo.altura,
        );
        contexto.drawImage(
            sprites,
            fundo.spriteX, fundo.spriteY, fundo.largura,
            fundo.altura, fundo.x + 276, fundo.y, fundo.largura,
            fundo.altura,
        );
     },
     atualiza() {
        fundo.x = fundo.x - 0.5;
        fundo.x = fundo.x % (fundo.largura / 2);
        
    }
}

const inicio = {
    spriteX: 130,
    spriteY: 0, 
    largura: 180,
    altura: 152,
    x: 70,
    y: 70,
     desenha() {
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY, inicio.largura,
            inicio.altura, inicio.x, inicio.y, inicio.largura,
            inicio.altura,
        );
     }
}

const telainicio= {
    desenha(){
        fundo.desenha();
        chao.desenha();
        flappyBird.desenha();
        inicio.desenha();

    },
    click(){
        telaativa = telajogo;
    }
}

const telajogo= {
    desenha(){
        fundo.desenha();
        fundo.atualiza();
        chao.desenha();
        chao.atualiza();
        flappyBird.desenha();
        flappyBird.atualiza();
        canos.desenha();
    },
    click(){
        flappyBird.pula();
    }
}

const canos = {
    largura: 52,
    altura: 400, 
    ceu : {
        spriteX: 52,
        spriteY: 169,
        x: 120,
        y: -150
    },
    chao: {
        spriteX: 0,
        spriteY: 169
    },
    pares: [],
    desenha() {
        const espacamentoentrecanos = 80;
        for (i=0;i<canos.pares.length;i++){
            canos.ceu.x = canos.pares[i].x;
            canos.ceu.y = canos.pares[i].y;
        }
        contexto.drawImage(
            sprites,
            canos.ceu.spriteX, canos.ceu.spriteY, canos.largura, 
            canos.altura, canos.ceu.x, canos.ceu.y, canos.largura,
            canos.altura
        )
        const canochaoX = canos.ceu.x;
        const canoChaoY = canos.altura + espacamentoentrecanos + canos.ceu.y;
        contexto.drawImage(
            sprites,
            canos.chao.spriteX, canos.chao.spriteY, canos.largura, 
            canos.altura, canochaoX, canoChaoY, canos.largura,
            canos.altura
        )
    },
    atualiza() {
        for(i=o;i<canos.pares.length;i++){
            const par = canos.pares[i];
            par.x = par.x - 2;
        } 
        const passou100frames = (animation_frame % 100 === 0);
        if (passou100frames) {
            const novopar = {
                x: canvas.width,
                y: -150,
            }
            canos.pares.push(novopar)
        } 
    }
}

var telaativa = telainicio;

function mudatelaativa(){
    telaativa.click();
}

function fazcolisao(){
    const limite = chao.y;
    if (flappyBird.y + flappyBird.altura > limite){
        return true;
    }

    return false;
}

window.addEventListener("click", mudatelaativa)

function loop() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)
    telaativa.desenha()
    requestAnimationFrame(loop);
    animation_frame = animation_frame + 1;
}

loop();
