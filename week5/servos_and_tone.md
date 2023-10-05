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
We can also use pulses to control other things like servo motors! [A servo motor is a geared motor with a circuit and a potentiometer inside](http://www.jameco.com/jameco/workshop/howitworks/how-servo-motors-work.html). The pot measures the angle of the gearhead, allowing us to position it exactly where we would like. Most servos rotate 180 degrees.

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
One thing to note about servos is that their wire color can vary. If you have a servo that has a black and red cable, you can safely assume red is power, black is ground, and the third wire is your signal. If you have one that's orange, red brown, I've found this is generally the proper wiring : red is 5v, brown is ground, and orange is the signal. If you have something different, search for the model number of the servo online, or look up something like "servo wires " + the colors of the wires.
