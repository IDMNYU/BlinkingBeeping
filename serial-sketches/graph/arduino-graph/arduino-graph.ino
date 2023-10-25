int potPin = A0;

void setup() {
  Serial.begin(57600);
}

void loop() {

Serial.println(analogRead(potPin));
delay(33);
}