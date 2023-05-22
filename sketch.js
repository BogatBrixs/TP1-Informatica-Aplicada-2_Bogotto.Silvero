let figuras = [];
let distanciaEntreFiguras = 50; // distancia fija entre las figuras
let escalaMinima = 0.9; // escala mínima de las figuras
let escalaMaxima = 1.6; // escala máxima de las figuras

let formaActual = "circulo";

let angle = 0; // VARIABLE QUE SERVIRÁ PARA DEFINIR EL ÁNGULO DE ROTACIÓN DE LAS FIGURAS


let colorDeFondo; //variable global de color celeste
let colorDeFondo2; //variable global de color rojo
let colorActual; // Variable que almacena el color actual
let cambioColor = false; // Variable de bandera para el cambio de color

let cantidadFiguras = 19;

let granos;

let saturacionDeseada = 80; // Valor de saturación deseado (0-100)


function preload() {
  granos = loadImage('filtro.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
   // LAS FIGURAS TIENEN COMO PUNTO DE ORIGEN SU CENTRO

  // Creamos la primera y última figura con tamaños definidos
  let primeraFigura = new Figura(0, 0, 30);
  let ultimaFigura = new Figura(0, 0, 60);
  
  colorDeFondo = color(97,168,217); // Definir color celeste
  colorDeFondo2 = color(222, 105, 83); // Definir color rojo
  colorActual = colorDeFondo; // Establecer el color inicial

  // Calculamos la escala máxima y mínima de las figuras intermedias
  let escalaMinimaIntermedia = escalaMinima * primeraFigura.size / ultimaFigura.size;
  let escalaMaximaIntermedia = escalaMaxima * primeraFigura.size / ultimaFigura.size;

  // Creamos las figuras intermedias con una escala que varía entre la mínima y máxima calculadas
  for(let i = 1; i < 13; i++) {
    let escalaIntermedia = map(i, 1, 10, escalaMinimaIntermedia, escalaMaximaIntermedia);
    let nuevaFigura = new Figura(0, 0, primeraFigura.size * escalaIntermedia * (i));
    figuras.push(nuevaFigura);
  }

  rectMode( CENTER );
  // ANGULO EN GRADOS
  angleMode( DEGREES );
  frameRate( 60 ); // DEFINO UN NUMERO ESTABLECIDO DE FOTOGRAMAS

}

function draw() {
  background(255);

  push();
  translate(width/2, height/2);
  for(let i = 0; i < figuras.length; i++) {
    figuras[figuras.length-i-1].update(mouseY);

   

    figuras[figuras.length-i-1].display(i, figuras.length);
  }
pop();
// Dibuja la imagen con opacidad
tint(255, 50); // 128 es el valor de opacidad (0 es completamente transparente y 255 es opaco)
image(granos,0,0, width, height); // Cambia las coordenadas y dimensiones según tus necesidades
}

function keyPressed() {
  if (key == "1") {        // Tecla 1
    formaActual = "cuadrado";
  } else if (key == "2") { // Tecla 2
    formaActual = "circulo";
  } else if (key == "3") { // Tecla 3
    formaActual = "triangulo";
  } else if (key == "4") { // Tecla 4
    formaActual = "pentagono";
  } else if (key == "5") { // Tecla 5
    formaActual = "hexagono";
  } else if (key == "6") { // Tecla 6
    formaActual = "galleta";
  } else if (key == "7") { // Tecla 7
    formaActual = "estrella";
  } 

}

//CLASE//
class Figura {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.originalSize = size;
    this.escalaColor = color(255, 0 , 0);

  }

  update(mouseY) {
    // cambiamos el tamaño de la figura basado en la posición del mouse en el eje Y
    let escala = map(mouseY, 0, height, escalaMinima, escalaMaxima);
    this.size = this.originalSize * escala;
  }

  display(indice, cantidad) {
    // calculamos el valor de transparencia de la figura
    //let transparencia = map(indice, 0, cantidad - 1, 255, 0);
      let mezcla = map(indice, 0, cantidad , 0, 2);
      if (mezcla < 1)
      {
        this.escalaColor= lerpColor(color(250,250,250),colorActual,mezcla);

      } else {
        this.escalaColor= lerpColor(colorActual, color(36,25,50),mezcla-1);
      }
    //this.escalaColor.setAlpha(100);
    fill(this.escalaColor);

  // dibujamos la figura con el gradiente de color celeste
  noStroke();
 // fill(currentColor);
  ellipseMode(CENTER);
  
  
  //---------------------FUNCIONAMIENTO DE LAS 7 FIGURAS---------------------//
  switch (formaActual) {
    case "cuadrado":
      rotate(angle + 15 * (width/2 +- mouseX) / width)
      rectMode(CENTER);
      rect(this.x, this.y, this.size * 1.5, this.size * 1.5);
      break;

    case "circulo":
      rotate(angle + 25 * (width/3 +- mouseX) / width)
      ellipseMode(CENTER);
      ellipse(this.x * sin(angle), this.y, this.size * 1.6, this.size * 1.7);
      break;

    case "triangulo":
      rotate(angle + 10 * (width/2 +- mouseX) / width)
      beginShape();
      for (let i = 0; i < 5; i++) {
        let angulo = 600  * i - 5;
        let x = this.x + ((cos(angulo) * (this.size * 0.9))); //aumento de tamaño en x
        let y = this.y + ((sin(angulo) * (this.size * 0.9))); //aumento de tamaño en y
        vertex(x, y);
      }
      endShape(CLOSE);
      break;

    case "pentagono":
        rotate(angle + 20 * (width/2 +- mouseX) / width)
        beginShape();

        for (let i = 0; i < 5; i++) {
          let angulo =  i * 360 /5;
          let x = ((this.x ) + cos(angulo) * (this.size * 0.9)); //aumento de tamaño en x
          let y = ((this.y ) + sin(angulo) * (this.size * 0.9)); //aumento de tamaño en y
          vertex(x, y);
        }
        endShape(CLOSE);
        break;

    case "hexagono":
        rotate(angle + 20 * (width/2 +- mouseX) / width)
        beginShape();
       
        for (let i = 0; i < 6; i++) {
          let angulo =  i * 360 / 6;
          let x = this.x + ((cos(angulo) * (this.size * 0.9))); //aumento de tamaño en x
          let y = this.y + ((sin(angulo) * (this.size * 0.9))); //aumento de tamaño en y
          vertex(x, y);
        }
        endShape(CLOSE);
        break;

    case "galleta":
      rotate(angle + 20 * (width/2 +- mouseX) / width)

      beginShape();
      //let radio = this.size;
      for (let i = 0; i < 360; i++) {
        let angulo = 100  - i * 50;
        let x = this.x + ((cos(angulo) * (this.size * 0.9))); //aumento de tamaño en x
        let y = this.y + ((sin(angulo) * (this.size * 0.9))); //aumento de tamaño en y
        vertex(x, y);
      }
      endShape(CLOSE);
    break;
      
    case "estrella":
      rotate(angle + 20 * (width/2 +- mouseX) / width)
      beginShape();
      for (let i = 0; i < 100; i++) {
        let angulo = (mouseX * 2.5) * i/30;
        let x = this.x + ((cos(angulo) * (this.size * 0.9))); //aumento de tamaño en x
        let y = this.y + ((sin(angulo) * (this.size * 0.9))); //aumento de tamaño en y
        vertex(x, y);
      }
      endShape(CLOSE);
    break;
      }
  }
}

function mouseClicked() {
  // Cambia entre los dos colores al hacer clic
  cambioColor = !cambioColor; // Invierte el valor de la bandera

  if (cambioColor) {
    colorActual = colorDeFondo2;
  } else {
    colorActual = colorDeFondo;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}