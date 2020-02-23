const int led = 3; // LED pin
const int sensor = A7; // Photocell pin

int ledVal; // variable to hold the LED brightness
int sensorVal; // variable to hold the sensor information

// constants to hold the sensor minimum and maximum values
const int senseMin = 100;
const int senseMax = 80;

void setup() {
  Serial.begin(9600); // start serial communication
  pinMode(led, OUTPUT); // configire the LED as an output
}

void loop() {
  // read the value of the sensor and store it in a variable
  sensorVal = analogRead(sensor);

  // map the maximum and minimum values seen in the serial monitor
  ledVal = map(sensorVal, senseMin, senseMax, 0, 255);
  // constrain the values to 0-255
  ledVal = constrain(ledVal, 0, 255);

  analogWrite(led, ledVal); // write out to the LED

  // print out the data to the serial monitor
  Serial.print("Sensor Val : ");
  Serial.print(sensorVal);
  Serial.print(", LED Val : ");
  Serial.println(ledVal);

}
