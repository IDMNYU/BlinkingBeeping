const int pot = A7; // analog input the pot is connected to 
int potVal; // variable to hold the pot value
const int led = 3; // pin the LED is connected to

void setup() {
  // turn on serial communication
  Serial.begin(9600);
  // configure the LED pin as an output
  pinMode(led, OUTPUT);
}

void loop() {
  // read the value on ther sensor pin
  potVal = analogRead(pot);
  // blink the led, delaying its on/off time based on the value 
  // of the sensor
  digitalWrite(led, HIGH);
  delay(potVal);
  digitalWrite(led, LOW);
  delay(potVal);

  // write the data to the serial monitor
  Serial.println(potVal);
  
}
