
So far we have touched on the physical side of the world of electronics, but what is even more exciting is that we can use computers to communicate with one another. A good starting point for that is sending information between a microcontroller and a multimedia computer.

We’ll send some information from the Arduino to a p5js sketch, then do the reverse. Eventually we’ll have the machines doing full fledged communication with each other.

Our Arduino sketches cannot speak to the browser directly. We need to install some software which will enable communication between the two.

These examples use the (p5.webserial library)[https://github.com/gohai/p5.webserial/]

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
  // wait a millisecondsbefore the next loop
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
const int ledPin = 13; // the pin that the LED is attached to
int incomingByte;      // a variable to read incoming serial data into

void setup() {
  // initialize serial communication:
  Serial.begin(9600);
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // see if there's incoming serial data:
  if (Serial.available() > 0) {
    // read the oldest byte in the serial buffer:
    incomingByte = Serial.read();
    // if it's a capital H (ASCII 72), turn on the LED:
    if (incomingByte == 'H') {
      digitalWrite(ledPin, HIGH);
    }
    // if it's an L (ASCII 76) turn off the LED:
    if (incomingByte == 'L') {
      digitalWrite(ledPin, LOW);
    }
  }
}

```

p5js
```javascript

var serial;                             // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem141301';  // fill in your serial port name here

function setup() {
  createCanvas(400, 300);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function draw() {
  // black background, white text:
  background(0);
  fill(255);
  // display the incoming serial data as a string:
  text("sensor value: " + inData, 30, 30);
  printData("sensor value: " + inData);
}
// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {

// nothinhg here
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}


function printData(inString) {
// nothing here
}

function mousePressed() {
  if (value === 0) {
    serial.write(0);
  } else {
    serial.write(1);
  }
}

```

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

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var xPos = 0;
var yPos = 0; // y location of the circle
var circleColor = 255; // color of the circle

function setup() {
 createCanvas(640, 480); // make canvas
 background(0); // black background
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 serial.on('connected', serverConnected); // callback for connecting to the server
 serial.on('open', portOpen); // callback for the port opening
 serial.on('data', serialEvent); // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.on('close', portClose); // callback for the port closing

 serial.list(); // list the serial ports
 serial.open(portName); // open a serial port
}


function draw(){
 background(255, 255, 0);
 fill(circleColor); // fill depends on the button
 ellipse(xPos, yPos, 50, 50); // draw the circle
 print("circle color: " + circleColor);
}


function serialEvent() {
 // read a string from the serial port
 // until you get carriage return and newline:
 var inString = serial.readStringUntil('\r\n');

 //check to see that there's actually a string there:

 if (inString.length > 0) {

 if (inString !== "hello") {

 inString = inString.trim(); // get rid of whitepace

 var sensors = split(inString, ','); // split the string on the commas

 if (sensors.length > 1) { // if there are more than 1 element
  yPos = map(Number(sensors[0]), 0, 1023, 0, height); // element 0 is the ypos
  xPos = map(Number(sensors[1]), 0, 1023, 0, width); // element 1 is the xPos
  circleColor = 255 - (Number(sensors[2]) * 255); // element 2 is the button
  }
 }
 serial.write('x');
 }
}

function serialError(err) {
 println('Something went wrong with the serial port. ' + err);
}

function portClose() {
 println('The serial port closed.');
}

function printList(portList) {
 for (var i = 0; i < portList.length; i++) {
 println(i + " " + portList[i]);
 }
}

function serverConnected() {
 println('connected to server.');
}

function portOpen() {
 println('the serial port opened.')
}
```
