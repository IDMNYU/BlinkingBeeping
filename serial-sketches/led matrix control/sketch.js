let cap;
let port; // object to hold serial port

function setup() {
  createCanvas(16, 9);

  // create instance of the serial lib
  port = createSerial();

  // ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)
  c = createButton('Connect to Arduino');
  c.position(10, 10);
  c.mousePressed(connectBtnClick);

  cap = createCapture(VIDEO);
  // set the size of the capture
  cap.size(1280, 720);
  // hide the HTML video
  cap.hide();
  frameRate(20);
}

function draw() {
  image(cap, 0, 0, 16, 9);
  loadPixels();
  let toSend = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let idx = (x + y * width);
      let c = get(x, y);
      let r = red(c);
      let g = green(c);
      let b = blue(c);

      let gscale = int((r + g + b) / 3);
      toSend[idx] = gscale;
    }
  }


  // changes button label based on connection status
  if (!port.opened()) {
    c.html('Connect to Arduino');
  } else {
    c.html('Disconnect');
    for (let i = 0; i < toSend.length; i++) {
      port.write(toSend[i]);
    }
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 115200);
  } else {
    port.close();
  }
}



/* ARDUINO CODE

// necessary libraries 
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_IS31FL3731.h>
// instance of the matrix
Adafruit_IS31FL3731 ledmatrix = Adafruit_IS31FL3731();
// gamma lookup
uint8_t gamma8[] = {
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,
  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,
  2,  3,  3,  3,  3,  3,  3,  3,  4,  4,  4,  4,  4,  5,  5,  5,
  5,  6,  6,  6,  6,  7,  7,  7,  7,  8,  8,  8,  9,  9,  9, 10,
  10, 10, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16,
  17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 24, 24, 25,
  25, 26, 27, 27, 28, 29, 29, 30, 31, 32, 32, 33, 34, 35, 35, 36,
  37, 38, 39, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 50,
  51, 52, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 66, 67, 68,
  69, 70, 72, 73, 74, 75, 77, 78, 79, 81, 82, 83, 85, 86, 87, 89,
  90, 92, 93, 95, 96, 98, 99, 101, 102, 104, 105, 107, 109, 110, 112, 114,
  115, 117, 119, 120, 122, 124, 126, 127, 129, 131, 133, 135, 137, 138, 140, 142,
  144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 167, 169, 171, 173, 175,
  177, 180, 182, 184, 186, 189, 191, 193, 196, 198, 200, 203, 205, 208, 210, 213,
  215, 218, 220, 223, 225, 228, 231, 233, 236, 239, 241, 244, 247, 249, 252, 255
};

const int numLed = 16*9; // number of lights
// array to hold values
byte toLights[numLed];
// counter
int loopme = 0;

void setup() {
  // serial speed. make sure it matches whatever you're sending
  Serial.begin(115200);
  // clear the screen
 ledmatrix.clear();
}

void loop() {

 // if there's data in the serial buffer
  // loop through and store it in the array
  if (Serial.available() && loopme < numLed) {
    // read the data one byte at a time
    byte inByte = Serial.read();
    toLights[loopme] = inByte;
    loopme++;
  }

  // if we have a full array
  // send the data to the lights
  // reset the counter
  if (loopme == numLed) {
    sendData();
    loopme = 0;
  }
}

//  send values to the lights using the gamma lookup table
void sendData() {
  for (int i = 0; i < numLed; i++) { 
    // convert array to x/y coordinates
    int y = i/16;
    int x = i-(y*16);
     ledmatrix.drawPixel(x, y, gamma8[toLights[i]]);
  }
}

*/