let port; // object to hold serial port
let sensors = []; // input array
let bgCol, fgCol; // colors
let x, y; // position of image
let connectButton; // connetcion button
let clear = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //colors
  colorMode(HSB);

  // create instance of the lib
  port = createSerial();

  // ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)
  connectButton = createButton('Connect to Arduino');
  connectButton.position(10, 10);
  connectButton.mousePressed(connectBtnClick);

  smooth();
  bgColor = color(220, 0, 0);
  fgColor = color(220, 100, 100);
}

function draw() {
  // if valid data
  if (port.availableBytes() > 0) {
    // read til newline
    let str = port.readUntil("\n");
    // trim whitespace
    str.trim();


    // make sure something is actually there
    if (!str) {
      return;
    }

    sensors = split(str, ",");
    if (sensors.length > 2) {
      x = map(sensors[0], 0, 1023, 0, width);
      y = map(sensors[1], 0, 1023, 0, height);

      console.log(str);
      if (sensors[2] == 1) {
        fgColor = color(220, 100, 220);
      } else {
        fgColor = color(0, 0, 0);
        background(bgColor);
      }
    }

    // if it's the first time, get rid of extra stuff
    if (!clear) {
      // clare the buffer
      port.read();
      clear = true;
    }
    // send return byte
    port.write("A");
  }


  noStroke();
  
  fill(fgColor);
  ellipse(x, y, 50);


  // changes button label based on connection status
  if (!port.opened()) {
    connectButton.html('Connect to Arduino');
  } else {
    connectButton.html('Disconnect');
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