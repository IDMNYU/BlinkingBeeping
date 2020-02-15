void setup() {
  // put your setup code here, to run once:
  pinMode(2, OUTPUT); // configure pin 2 as an output
  pinMode(3, INPUT); // configure pin 3 as an input
}

void loop() {
  // put your main code here, to run repeatedly:

  if (digitalRead(3) == HIGH ) { // if 5V on pin 3, do something
    digitalWrite(2, HIGH); // write 5V to pin 2
  } else { // if not 5V 
    digitalWrite(2, LOW); // write 0V to pin 2
  }


}
