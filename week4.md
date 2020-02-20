# Week 4 - Friday February 21
* Presentations!
* discussion of readings
* Demonstrate homework
* analog input and output

We were talking previously about how awesome computers are at reconfiguring themselves to do different things. This was manifest in pins on the microcontroller that we could change the behavior of through software.

What we were lacking in this model though, something that we possess, is a sense of memory (regret, if you must). Our programs so far forget things as soon as we’re done with them. It’s not a very efficient method, like buying a new water bottle everytime you wanted a drink. Instead, let’s save the planet and use something over and over again. In programming, the tool we can use for this is a variable.

A variable, as it’s name implies, can change over time. This variance allows us to do all sorts of fun things not just in the moment, but by projecting into the future, and looking back to the past. We’ll look at how we can use variables in the context of our digital switches to start.

Code, as you may recall from last week, is a process of abstracting the computer’s language to a more human language. Abstracting this even further, we can break apart the computer’s process in our native tongue, then slowly transcribe this into code.

For example : “After pressing the button three times, blink the LED.”

This is a seemingly simple and straightforward thing, but there a number of discrete steps that need to be accomplished. Writing out all the steps like this is called “pseudo-code”

“Set one pin to be an input, and another to be an output. There’s a light attached to the output pin that is off to start. Create a variable to keep track of the button presses. Count the number of times the input pin is pulled high. when the pin goes high, add one to the variable’s number. When the variable equals ‘4’, turn the output on and off, and reset the variable to 0.”

While there’s a lot to unpack in there, we wind up with code that looks like this when done :
```C++
// declare global variables
int counter = 0;
int prevSwitchState = LOW;

void setup() { // configure pins
  pinMode(2, INPUT); pinMode(3, OUTPUT); // set initial pin state
  digitalWrite(3, LOW);
}

void loop() { // read the state of the switch into a local variable:
  int currentSwitchState = digitalRead(2); // compare current switch state to the previous state
  // if it is different and the current state is HIGH
  if (currentSwitchState != prevSwitchState && currentSwitchState == HIGH) {
    // add one to the counter
    counter++;// or counter=counter+1;
  }// evaluate the number of presses
  if (counter == 4) { // blink the LED:
    digitalWrite(3, HIGH);
    delay(100);
    digitalWrite(3, LOW);
    delay(100);
    digitalWrite(3, HIGH);
    delay(100);
    digitalWrite(3, LOW);
    delay(100);
    digitalWrite(3, HIGH);
    delay(100);
    digitalWrite(3, LOW);
    delay(100);
    digitalWrite(3, HIGH);
    delay(100);
    digitalWrite(3, LOW);
    delay(100); // reset the counter
    counter = 0;
  }
  // set the last switch state to the current one
  // for the next time through the loop
  prevSwitchState = currentSwitchState;
}
```
There are a couple things that need to be done with variables to use them. First, you need to declare the data type (what kind is it?), initialize it (what’s it called? does it have an initial value?), then make changes (vary it).

The kinds of variables we use in Arduino are probably going to be limited to [boolean](https://www.arduino.cc/en/Reference/BooleanVariables), [byte](https://www.arduino.cc/en/Reference/Byte), [int](https://www.arduino.cc/en/Reference/Int), [long](https://www.arduino.cc/en/Reference/Long), & [char](https://www.arduino.cc/en/Reference/Char). More often than not, you’ll be using an `int`. This will hold most all the information you need.

* boolean : 2 values, true or false (1 or 0) (2 bits)
* byte : 256 values (8 bits , or 1 byte)
* char : 256 values, expressed as a letter (8 bits , or 1 byte) )
* int : -32,768 to 32,767 (16-bits , or 2 bytes)
* long : -2,147,483,648 to 2,147,483,647 (32-bits or 4 bytes)

A bit is a 0 or 1. it’s the smallest unit of measurement in a computer. We string these together in a computer’s memory to make larger numbers. This binary notation (2 to the power of something) allows computers to store values larger than 0 or 1.

You _declare_ a variable like this :

```C++
int sensorNum;
int sensorThreshold=666;
```

In the first instance, you’re not giving it an initial value. Arduino will give it a 0. In the second instance, you’re saying “sensorThreshold equals six-hundred-sixty-six, until the program or I tell it to change.”

The names can be anything that start with a letter and contain no spaces. They should be informative, and it’s usually helpful to camelHump them. Variables can also be used to name items like pins, so that you have easily identifiable names for things.

[Variables have scope](https://www.arduino.cc/en/Reference/Scope), in that some are global, and available anywhere in your program, while others are local, and can only be seen by functions in which they are declared. Global variables are declared at the top of your program. Local variables are declared inside a function or loop.

This far, we’ve worked with digital sensors, that is, things that are either on or off. While this binary system is great for computers, we live in a world that’s not quite so black and white.

The physical world exists along a spectrum, and, fortunately for us, there are a wide variety of sensors that can get information about the physical world. With some sleight of hand, we can teach computers about the world around us. We’ll address a few of the many different types of sensors in a little bit. First, how do we trick the computer?

On your Arduino, there’s a special circuit called an ADC (an analog to digital converter). This samples the voltage on pins A0-A5, allowing us to translate voltage into a numeric representation. Different microcontrollers have different sampling resolutions. The Arduino has a 10-bit resolution. This means we can get a value between 0-1023 that represents the analog voltage on the pin (1024 total steps). 0 corresponds to 0 volts, 1023 corresponds to 5v. Lucky for us, this fits neatly inside an int.

To get the value from a sensor, you call [analogRead()](https://www.arduino.cc/en/Reference/analogRead). This takes one argument, the pin you wish to read the value from.
```C++
mySensorValue=analogRead(A0);
```

We can see the results of an analogRead in number of ways. To replicate what we’ve been doing with the LEDs so far, we can use this value to change the delay of our blinking light :

```C++
const int ledPin=7;// naming the ledPin. constants don't change
const int potPin=A0;// naming the input pin
int sensorVal;// holds the sensor value, also delays the blinking LED

void setup(){
    pinMode(ledPin,OUTPUT);// set the LED pin as an output
}

void loop(){
    int delayTime;// local variable to hold delay time
    sensorVal=analogRead(potPin);// read the sensor value, save it in a variable
    delayTime=sensorVal;// save the value in the local var
    digitalWrite(ledPin,HIGH);
    delay(delayTime);// delay per sensor reading
    digitalWrite(ledPin,LOW);
    delay(delayTime);// delay per sensor reading
}
```
Now that we have our code, let’s look at the circuit. The LED on pin 7 should be familiar from last week. Our sensor will be connected to pin A0. The easiest thing to get started with is a potentiometer.

A potentiometer is a self contained [voltage divider](https://learn.sparkfun.com/tutorials/voltage-dividers), often appearing as a knob or slider. The inside of a slider looks like this : (many thanks to [Jeff Fedderson for the image](http://fddrsn.net/pcomp/examples/potentiometers.html)) :

![a pot](http://cc.droolcup.com/wp-content/uploads/2015/07/potentiometer1.gif)

The center pin acts as a wiper moving across the resistive material. The voltage coming off the center pin (the wiper) increases the further it moves away from pin A, where power is applied. We measure the voltage of the center pin on the Arduino. Potentiometers are not polarized, so A&B are interchangeable.

![analog input UNO](http://cc.droolcup.com/wp-content/uploads/2015/07/pot.png)

For other analog sensors (photocells, FSRs, flex sensors, etc.), you need to build a small circuit with a pulldown resistor, just like with the switch. In this case, you’re building your own voltage divider. A general rule of thumb for selecting the proper resistor value is to match the maximum sensor resistance. If you aren’t sure, start with a 10k resistor and see what your output is like.

![analog input uno photocell](http://cc.droolcup.com/wp-content/uploads/2015/07/photocell.png)

One more thing that will help you involves another new function called [Serial.println()](https://www.arduino.cc/en/Serial/println) This sends information from the Arduino back to your computer. You can use the build in serial monitor to see this information. The serial monitor can be accessed through the Tools menu :

![serial monitor](http://cc.droolcup.com/wp-content/uploads/2015/07/Screen-Shot-2015-07-14-at-3.51.00-PM-300x117.png)

You can also access it by clicking on the magnifying glass icon on the right side of the main bar :

![not a duck](http://cc.droolcup.com/wp-content/uploads/2015/07/Screen-Shot-2015-07-14-at-3.50.35-PM-300x20.png)

To start sending information serially, you must include [Serial.begin()](https://www.arduino.cc/en/Serial/begin) in your setup(). It takes an argument that indicates how fast it will communicate with your computer. For the time being, use 9600.
```C++
const int potPin=A0;// naming the input pin
int sensorVal;// holds the sensor value, also delays the blinking LED

void setup(){
    Serial.begin(9600);// open the serial connection at 9600 baud
}

void loop(){
    sensorVal=analogRead(potPin);// read the sensor value, save it in a variable
    Serial.println(sensorVal);// send the value of the sensor over the serial monitor
    delay(2);// slight pause for the cause
}
```
If you’re using a sensor that runs off of a voltage less than 5V, you will not get the full resolution of the sensor unless you call the [analogReference()](https://www.arduino.cc/en/Reference/analogReference) function and provide the Arduino with the appropriate reference voltage on the AREF pin.

So far, we’ve managed to get the microcontroller to read digital & analog inputs, and set a variety of fancy LED effects. Now it’s time to make some even more fancy things happen.

The microcontroller has the ability to read variable voltages, but what about sending out a variable voltage? Unfortunately, unless we’re using a high end microcontroller with a built in DAC (digital to analog converter), there’s no way to get a true analog voltage out of the microcontroller. However, we can fake it with a technique called Pulse Width Modification (PWM).

On your Arduino Uno, you’ll notice that there are some digital pins with a ~ next to the number. These pins have PWM capabilities.

PWM is a method in which you pulse a pin on and off rapidly to give the illusion of a variable voltage. This is also called an effective voltage. The Arduino has an 8-bit PWM, which means there are 256 discrete steps available to us. In each period the pin will be pulled HIGH for a fraction of the time and LOW for the rest. The percentage of time this rapid on/off happens can be described as the duty cycle.

The method for communicating with the Arduino is called [analogWrite()](https://www.arduino.cc/en/Reference/AnalogWrite). It takes two arguments. The first argument is the pin you’re communicating with. The second argument is the value you wish to write. 0 is the same as 0V, 255 is the same a 5V. 127 would be 2.5V, and everything else in between maps out linearly.

It’s pretty simple to hook up a pot to an analog input and use that to control an LED’s brightness. Remember though, analogRead() returns a value between 0-1023, while analogWrite() only goes between 0-255. 256 goes into 1024 four times, so we can divide by 4 to get a nice mapping between the two :
```C++
const int potPin=A0;// naming the input pin
const int ledPin=3;// led on PWM pin
int sensorVal;// holds the sensor value
int ledBright;// LED brightness

void setup(){
    pinMode(ledPin,OUTPUT);
}

void loop(){
    sensorVal=analogRead(potPin);// read the sensor value, save it in a variable
    ledBright=sensorVal/4;// divide by 4 to scale appropriately
    analogWrite(ledPin,ledBright);// PWM the LED
    delay(2);// pause for the cause
}
```

Speaking of mapping, it’s not a bad idea to think about how we would go about getting the full range of an LED when using a sensor like a photocell (which tends to have a more limited range than a pot).

Let’s assume we have a photocell that gives us 400 as a low value from analogRead() and 800 as an upper value. Clearly this isn’t going to work well for fading an LED. We could math our way out of the problem, but fortunately for us, we can use a function called [map()](https://www.arduino.cc/en/Reference/map) which does the math for us. map() changes a number from one value to another based on a set of ranges. It takes 5 arguments : value to change, low value from input, high value from input, low output, high output. So if we were to use map() in out existing example, and we wanted 400 from the sensor to be 0 to analogWrite(), and 800 from the sensor to 255 for analogWrite(), we could do the following :
```C++
sensorVal=analogRead(A0);
mappedVal=map(sensorVal,400,800,0,255);
analogWrite(mappedVal,ledPin);
```
map() doesn’t constrain numbers, so it’s possible to get mapped values outside the desired range. We can remedy that by 1) adding or subtracting some to the incoming values, or 2) calling the constrain() function. constrain() places an upper and lower bound on a number.
```C++
mappedVal=constrain(mappedVal,0,255);
```
Another way to deal with sensors that have variability in their inputs (and deal with environmental differences) is to [calibrate your sensors](https://www.arduino.cc/en/Tutorial/Calibration), mapping from the max & min values.

Related to PWM, but different, is frequency modulation. We can use this in conjunction with a small speaker or piezo element to generate a sound. In PWM, there’s a fixed frequency. With [tone()](https://www.arduino.cc/en/Reference/tone), you can change the frequency of a duty cycle fixed at 50%. In this example, there are switches attached to pins 2, 3 & 4.
```C++
void setup(){
    for(int x=0;x<=2;x++){
    pinMode(x+2,INPUT);
    }
}

void loop(){
    if(digitalRead(2)==HIGH){
        tone(8,440,20);
    } else if(digitalRead(3)==HIGH){
        tone(8,494,20);
    } else if(digitalRead(4)==HIGH){
        tone(8,131,20);
    }else{
        noTone(8);
    }
}
```
We can also use pulses to control other things .. like motors! [A servo motor is a geared motor with a circuit and a potentiometer inside](http://www.jameco.com/jameco/workshop/howitworks/how-servo-motors-work.html). The pot measures the angle of the gearhead, allowing us to position it exactly where we would like. Most servos rotate 180 degrees.

The circuit inside the servo listens for a series of pulses that dictate where the motor should rotate to. While it’s possible to write code that sends the pulses using [delayMicroseconds()](https://www.arduino.cc/en/Reference/DelayMicroseconds) and a self-programmed timer like below :
```C++
int servoPin=2;// Control pin for servo motor
int minPulse=750;// Minimum servo position
int maxPulse=2500;// Maximum servo position
int pulse=0;// Amount to pulse the servo
long lastPulse=0;// the time in milliseconds of the last pulse
int refreshTime=20;// the time needed in between pulses
int analogValue=0;// the value returned from the analog sensor
int analogPin=0;// the analog pin that the sensor's on

void setup(){
    pinMode(servoPin,OUTPUT);// Set servo pin as an output 
    pinpulse=minPulse;// Set the motor position value to the minimum
    Serial.begin(9600);
}

void loop(){
    analogValue=analogRead(analogPin);// read the analog input
    pulse=map(analogValue,0,1023,minPulse,maxPulse);// convert the analog value
    // to a range between minPulse and maxPulse.
    // pulse the servo again if the refresh time (20 ms) has passed:
    if(millis()-lastPulse>=refreshTime){
        digitalWrite(servoPin,HIGH);// Turn the motor on
        delayMicroseconds(pulse);// Length of the pulse sets the motor position
        digitalWrite(servoPin,LOW);// Turn the motor off
        lastPulse=millis();// save the time of the last pulse
    }
    Serial.println(analogValue);
}
```
It’s hella easier to [simply use a library](https://www.arduino.cc/en/Reference/Libraries).

A library is an assemblage of code that extends the Arduino’s capabilities. [The Servo library is bundled with Arduino](https://www.arduino.cc/en/Reference/Servo) (you can [install other libraries](https://www.arduino.cc/en/Guide/Libraries), or [write your own if you’re feeling inspired](https://www.arduino.cc/en/Hacking/LibraryTutorial)).

The servo library generalizes the “problem” of writing the above code, and wraps it all up with a few easy to use functions. To use a library in a sketch, you must first import it at the beginning of your sketch.
```C++
#include <Servo.h>
```
Once that’s there, you have access to all the functions in the library. To use a servo once you’ve imported the library, you’ll need to create an instance of the servo library. Think of it like creating a specialized variable (instead of int or long, you’re creating a type Servo). Once that’s done, you’ll need to [attach()](https://www.arduino.cc/en/Reference/ServoAttach) the servo to the pin it’s on, then you’ll be able to [write()](https://www.arduino.cc/en/Reference/ServoWrite) any angle you want. Below is code that will [allow you to control the position of a servo with a pot or another analog sensor.](https://www.arduino.cc/en/Tutorial/Knob)
```C++
/*
 Controlling a servo position using a potentiometer (variable resistor)
 by Michal Rinott <http://people.interaction-ivrea.it/m.rinott>

 modified on 8 Nov 2013
 by Scott Fitzgerald
 http://www.arduino.cc/en/Tutorial/Knob
*/

#include <Servo.h>

Servo myservo;  // create servo object to control a servo

int potpin = 0;  // analog pin used to connect the potentiometer
int val;    // variable to read the value from the analog pin

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
}

void loop() {
  val = analogRead(potpin);            // reads the value of the potentiometer (value between 0 and 1023)
  val = map(val, 0, 1023, 0, 180);     // scale it to use it with the servo (value between 0 and 180)
  myservo.write(val);                  // sets the servo position according to the scaled value
  delay(15);                           // waits for the servo to get there
}
```
One thing to note about servos is that their wire color can vary. If you have one where there is a red cable and a black cable, you can safely assume red is power, black is ground, and the third wire is your signal. If you have one that's orange, red brown, I've found this is generally the proper wiring : red is 5v, brown is ground, and orange is the signal. If you have something different, try and google the model number of the servo, or something like "servo wires " + colors of the wires.

* Midterm party

* Readings- 
  * [Phsyical Computing's Greatest Hits and Misses](https://www.tigoe.com/blog/category/physicalcomputing/176/)
* Assignment
  * Build a love machine that identifies how compatible two people are with the microcontroller. Use analog sensors for this. Ideally, work in pairs.
