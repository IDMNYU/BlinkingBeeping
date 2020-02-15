void setup() {
  // put your setup code here, to run once:
  pinMode(2, OUTPUT); // configure pin 2 as an output
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(2, HIGH); // write 5V to pin 2
  delay(500); // wait for half a sec
  digitalWrite(2, LOW); // write 0V to pin 2
  delay(500);
}
