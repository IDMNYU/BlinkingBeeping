// graphs sensor data from an analog 
// sensor on A0 to the window

let port; // object to hold serial port
let c, s; // buttons
let xpos = 0; // graph

function setup() {
  createCanvas(windowWidth, windowHeight);
  //colors
  colorMode(HSB);
  background(220, 100, 50);
  // create instance of the lib
  port = createSerial();

  // ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)
  c = createButton('Connect to Arduino');
  c.position(10, 10);
  c.mousePressed(connectBtnClick);
}

function draw() {
  // if data is available
  if(port.availableBytes() > 0){
  // read serial bufffer
  let str = port.readByte();
  // if there's valid data
  
    noStroke();
    fill(220, 100, 50);
    rect(0, 0, 250, 30);
    fill(20, 100, 100);
    text(str, c.width + 10, 20);
    stroke(20, 100, 100);
    let v = map(str, 0, 255, 0, height - 35);
    line(xpos, height, xpos, height - v);
    xpos++;
  }
  // changes button label based on connection status
  if (!port.opened()) {
    c.html('Connect to Arduino');
  } else {
    c.html('Disconnect');
  }
  if (xpos > width) {
    xpos = 0;
    background(220, 100, 50);
  }
}
// if the connect button is clicked and there's
// no connection, look for something named
// "Arduino"
function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}

/*
////////ARDUINO CODE BELOW
*/

/*
int potPin = A0;

void setup() {
  Serial.begin(57600);
}

void loop() {

Serial.println(analogRead(potPin));
delay(2);
}

*/