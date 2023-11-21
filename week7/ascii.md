
a slight digression into how 32 == the space bar, and 27 == the escape key.

The call and response method of exchanging data is a reliable and effective way you can communicate between machines. Here’s an Arduino layout and program that waits for a byte before it sends data to a p5.js sketch. there's a switch connected to pin 7, and 2 pots or other analog sensors, connected to A0 and A1.
```C++
void setup() {
  Serial.begin(9600);
  pinMode(7, INPUT);

  while (Serial.available() <= 0) {
    Serial.println("hello");
    delay(300);
  }
}

void loop() {
  if (Serial.available() > 0) {
    int inByte = Serial.read();
    //we did it to slow things down for synchronization
    //notice we didn't even put the number in anything

    int pot1 = analogRead(A0);
    int pot2 = analogRead(A1);
    int button = digitalRead(7);
    Serial.print(pot1);  //notice I did not say println
    Serial.print(",");
    Serial.print(pot2);
    Serial.print(","); //using the comma as a delimiter
    Serial.println(button);
  }
}
```

And the associated js code
```javascript
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
      if (sensors[2] == 0) {
        fgColor = color(220, 100, 100);
      } else {
        fgColor = color(220, 0, 0);
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
  background(bgColor);
  fill(fgColor);
  ellipse(x, y, 100);


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
```
