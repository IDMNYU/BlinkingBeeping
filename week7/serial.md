
So far we have touched on the physical side of the world of electronics, but what is even more exciting is that we can use computers to communicate with one another. A good starting point for that is sending information between a microcontroller and a multimedia computer.

We’ll send some information from the Arduino to a p5js sketch, then do the reverse. Eventually we’ll have the machines doing full fledged communication with each other.

Our Arduino sketches cannot speak to the browser directly. We need to install some software which will enable communication between the two.

These examples use the [p5.webserial library](https://github.com/gohai/p5.webserial/)

We can re-use some of our earlier Arduino sketches to communicate with the browser. Let’s revisit the analog output sketch we did :
```C++

/*Reads an analog input pin, maps the result to a range from 0 to 255
  and prints the results to the serial monitor.
  The circuit: * potentiometer connected to analog pin 7.
  Center pin of the potentiometer goes to the analog pin.
  side pins of the potentiometer go to +5V and ground

  This example code is in the public domain.*/

// These constants won't change. They're used to give names
// to the pins used:
const int analogInPin = A7;
// Analog input pin that the potentiometer is attached to
int sensorValue = 0; // value read from the pot
int outputValue = 0; // value output to the PWM (analog out)

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
}

void loop() {
  // read the analog in value:
  sensorValue = analogRead(analogInPin);
  // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 1023, 0, 255);
  // print the results to the serial monitor:
  Serial.write(outputValue);
  // wait a millisecond before the next loop
  // for the analog-to-digital converter to settle
  // after the last reading:
  delay(2);
}
```
Let’s open up the serial monitor.

Full of gibberish, right? We’ll explain that in a moment (it has to do with the difference between Serial.print() and Serial.write() )

For now, let’s be happy that it’s sending information.

To work with the p5 side, we have to do the following:

* Import the P5JS webserial Library into our sketch
* Make a Serial Object
* Find the Right USB port
* Read incoming messages
* profit!!!! (that’s actually number 4)

We need to add the library to our index.html
```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>
    <script src="https://unpkg.com/@gohai/p5.webserial@^1/libraries/p5.webserial.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />

  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>
```

Now for our javascript!
We need to create an instance of the serial library

```javascript
let port; // variable to hold an instance of the  library


function setup() {
    createCanvas(400, 300);
    // create an instance of the lib
    port = createSerial();
}

```
The webserial library can ID ports with names, like 'Arduino', so you only have to choose from a select number of options
It's good practoce to tie this to some sort of explicit interaction like a button press. The other argumet hwere is the speed at which the micrto communicates with your computer

```javascript
 port.open('Arduino', 57600);
```
 
We don’t need all of these for data, but they are helpful. serialEvent processes incoming data. If we made a global variable and passed it the information from serial.read(), we’d have a means of passing data from the arduino to our sketch.

Arduino sending ASCII
```C++
void setup() {
 Serial.begin(9600); // initialize serial communications
}
 
void loop() {
 int potentiometer = analogRead(A0);                    // read the input pin
 Serial.println(potentiometer);                         // print it out the serial port
 delay(20);                                            // slight delay to stabilize the ADC and account fo rspeped of drawing
}
```

Now if we wanted to pass data from the arduino to a sketch, we can do this :
```javascript
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
  // read serial bufffer
  let str = port.readUntil("\n");
  // get rid of whitespace
  str.trim();
  // if there's valid data
  if (str.length > 0) {
    noStroke();
    fill(220, 100, 50);
    rect(0, 0, 250, 30);
    fill(20, 100, 100);
    text(str, c.width + 10, 20);
    stroke(20, 100, 100);
    let v = map(str, 0, 1023, 0, height - 35);
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
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}
```

Awesome! We should see a graph of our sensor!


Sending to Arduino from p5js
Arduino code
```C++
const int ledPin = 2;  // the pin that the LED is attached to

void setup() {
  // initialize the serial communication:
  Serial.begin(57600);
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

```

p5js

```javascript
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
    port.open('Arduino', 57600);
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

```
