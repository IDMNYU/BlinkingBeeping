const int pot = A7;
int potVal;
const int led = 3;

void setup() {
  // put your setup code here, to run once:
  pinMode(led, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  potVal = analogRead(pot);
  digitalWrite(led, HIGH);
  delay(potVal);
  digitalWrite(led, LOW);
  delay(potVal);
}
