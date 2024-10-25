// slider in p5 to arduino

let port; // object to hold serial port
let c, s; // buttons
let ledVal; // slider
let auto = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //colors
  colorMode(HSB);

  // create instance of the lib
  port = createSerial();

  // ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)
  c = createButton('Connect to Arduino');
  c.position(10, 10);
  c.mousePressed(connectBtnClick);

  s = createButton('toggle Auto on');
  s.position(c.width + 10, 10);
  s.mousePressed(toggleAuto);

  ledVal = createSlider(0, 255, 0);
  ledVal.position(10, 50);
}

function draw() {
  noStroke();
  background(220, 100, 0);
  if (auto) {
    let newVal = int(map(sin(frameCount / 100), -1, 1, 0, 255));
    ledVal.value(newVal);
  }
  let toSend = ledVal.value();
  let b = map(toSend, 0, 255, 0, 100);
  let sz = map(toSend, 0, 255, 1, width);
  fill(50, 100, b);
  ellipse(width / 2, height / 2, sz);
  port.write(toSend);
  // changes button label based on connection status
  if (!port.opened()) {
    c.html('Connect to Arduino');
  } else {
    c.html('Disconnect');
  }

  // changes button label based on connection status
  if (!auto) {
    s.html('toggle Auto on');
  } else {
    s.html('toggle Auto off');
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

function toggleAuto() {
  auto = !auto;
  if (!auto) {
    ledVal.position(10, 50);
  } else {
    ledVal.position(-1000, -1000);
  }
}


/*
////////ARDUINO CODE BELOW
*/

/*

const int ledPin = 3;  // the pin that the LED is attached to

void setup() {
  // initialize the serial communication:
  Serial.begin(9600);
  // initialize the ledPin as an output:
  pinMode(ledPin, OUTPUT);
}

void loop() {
  byte brightness;

  // check if data has been sent from the computer:
  if (Serial.available()) {
    // read the most recent byte (which will be from 0 to 255):
    brightness = Serial.read();
    // set the brightness of the LED:
    analogWrite(ledPin, brightness);
  }
}

*/