const sprites = new Image();
sprites.src = './sprites.png';
const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d')
const sompunch = new Audio();
sompunch.src = './som_punch.wav';

let animation_frame = 0;

const jogo = {};

function inicializa(){
    jogo.flappyBird = criaflappybird();
    jogo.fundo = criafundo();
    jogo.chao = criachao();
    jogo.canos = criacanos();
    jogo.placar = criaplacar();

}


function criaflappybird(){
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
                telaativa = telagameover;
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
    return flappyBird
}

function criachao(){
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
    return chao
}

function criafundo(){
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
    
    return fundo
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
        jogo.fundo.desenha();
        jogo.chao.desenha();
        jogo.flappyBird.desenha();
        inicio.desenha();

    },
    click(){
        telaativa = telajogo;
    }
}

const telajogo= {
    desenha(){
        jogo.fundo.desenha();
        jogo.fundo.atualiza();
        jogo.canos.desenha();
        jogo.canos.atualiza();
        jogo.chao.desenha();
        jogo.chao.atualiza();
        jogo.flappyBird.desenha();
        jogo.flappyBird.atualiza();
        jogo.placar.desenha();
        jogo.placar.atualiza();
       
    },
    click(){
        jogo.flappyBird.pula();
    }
}

function criacanos(){
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
        espacamentoentrecanos: 120,
        desenha() {
            for (i=0;i<canos.pares.length;i++){
                canos.ceu.x = canos.pares[i].x;
                canos.ceu.y = canos.pares[i].y;
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canos.ceu.x, canos.ceu.y,
                    canos.largura, canos.altura,
                )
                const canoChaoX = canos.ceu.x;
                const canoChaoY = canos.altura + canos.espacamentoentrecanos + canos.ceu.y;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY, canos.largura, 
                    canos.altura, canoChaoX, canoChaoY, canos.largura,
                    canos.altura
                )
            }
        },
        atualiza() {
            for(i=0;i<canos.pares.length;i++){
                const par = canos.pares[i];
                par.x -= 2;

                if (par.x + canos.largura <= 0){
                    canos.pares.shift();
                }

                if (fazcolisaoobstaculo(par)){
                    sompunch.play();
                    telaativa = telagameover;
                    return;
                }
            } 
            const passou100frames = (animation_frame % 100 === 0);
            if (passou100frames) {
                const novopar = {
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                }
                canos.pares.push(novopar)
            } 
        }
    }

    return canos
}
function criaplacar(){
    const placar = {
        pontos: 0,
        desenha(){
            contexto.font = '35px "VT323"';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontos}`, canvas.width - 10 , 35);
        },
        atualiza(){ 
            const intervalodeframes = 20;
            const passou0intervalo = animation_frame % intervalodeframes === 0;

            if(passou0intervalo){
                placar.pontos = placar.pontos + 1;
            }
        }
    }
    return placar;
}

const gameover = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200, 
    x: 50,
    y: 70, 
    desenha(){
        contexto.drawImage(
            sprites, gameover.spriteX, gameover.spriteY, gameover.largura, gameover.altura,
            gameover.x, gameover.y, gameover.largura, gameover.altura
        );
    }
}

const telagameover = {
    desenha(){
        gameover.desenha();
    },
    click(){
        inicializa();
        telaativa = telajogo; 
    }
}

var telaativa = telainicio;

function inicializa(){
    jogo.flappyBird = criaflappybird();
    jogo.fundo = criafundo();
    jogo.chao = criachao();
    jogo.canos = criacanos();
    jogo.placar = criaplacar();

}

function fazcolisaoobstaculo(par){
        if(jogo.flappyBird.x >= par.x){
            const alturacabecaflappy = jogo.flappyBird.y;
            const alturapeflappy = jogo.flappyBird.y + jogo.flappyBird.altura;
            const bocacanoceuy = par.y + jogo.canos.altura;
            const bocacanochaoy = par.y + jogo.canos.altura + jogo.canos.espacamentoentrecanos;
            if (alturacabecaflappy <= bocacanoceuy){
                jogo.canos.pares =[];
                return true;
            }
            if (alturapeflappy >= bocacanochaoy){
                jogo.canos.pares =[];
                return true;
            }
        }
        return false;
}

function mudatelaativa(){
    telaativa.click();
}

function fazcolisao(){
    const limite = jogo.chao.y;
    if (jogo.flappyBird.y + jogo.flappyBird.altura > limite){
        jogo.canos.pares =[];
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

inicializa();
loop();
