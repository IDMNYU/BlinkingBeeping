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
  // print the results to the serial monitor:
  Serial.println(sensorValue);
  // wait a few milliseconds before the next loop
  // for the analog-to-digital converter to settle
  // and to not overflow the serial buffeer ont he far end
  delay(16);
}