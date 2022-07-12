Link do jogo - https://editor.p5js.org/TiagoBairosFranca/full/1lmWGnF0m


//variaveis do jogo
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;
let xRaquete = 5;
let yRaquete = 150;
let xRaqueteOponente =585;
let yRaqueteOponente =150;
let meusPontos = 0;
let pontosOponente = 0;
let chanceDeErrar = 0;
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let colidiu = false;
let velocidadeYOponente;
let imagemPingPong;
let trilha;
let ponto;
let raquetada;


function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
  imagemPingPong = loadImage("mesaping.png")
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(imagemPingPong);
  mostraBolinha ();
  movimentandoBolinha();
  verificacaoColisao();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  hitPontos();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
  
}

function mostraBolinha (){
  fill(color(250,128,114));
  circle(xBolinha, yBolinha, diametro);
  
}
function mostraRaquete (a, b){
  fill(color(210,180,140));
  rect(a, b, raqueteComprimento, raqueteAltura);
}

function incluiPlacar (){
  textAlign(CENTER)
  textSize (16)
  fill(color(0,255,0));
  rect(150, 10, 40, 20);
  fill(255)
  textStyle(BOLD);
  text(meusPontos, 170, 26);
  fill(color(0,255,0));
  rect (450, 10, 40, 20);
  fill(255)
  text(pontosOponente, 470, 26);
}

function movimentandoBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}
function verificacaoColisao (){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadexBolinha *= -1;
      }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeyBolinha *= -1;
    }
  }
function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
}
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
}
}
function verificaColisaoRaquete(){
    if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete)
{
    velocidadexBolinha *= -1;
  raquetada.play();
    }
}
function colisaoRaqueteBiblioteca(a,b){
    colidiu = 
    collideRectCircle(a, b, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
      velocidadexBolinha *= -1;
      raquetada.play();
    }
  }
function movimentaRaqueteOponente(){
velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
function hitPontos(){
  if (xBolinha > 590){
    meusPontos +=1
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente +=1
    ponto.play();
  }
}
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
