const int led = 3; // LED pin
const int pot = A7; // pot pin

int ledVal;
int potVal;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(led, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  potVal = analogRead(pot);

  ledVal = potVal/4;

  analogWrite(led, ledVal);

  Serial.print("Pot Val : ");
  Serial.print(potVal);
  Serial.print(", LED Val : ");
  Serial.println(ledVal);  

}
