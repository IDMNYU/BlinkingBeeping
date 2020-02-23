const int led = 3;
int ledVal;


void setup() {
  // put your setup code here, to run once:
  pinMode(led, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  for(int i = 0;i<255; i++){
    analogWrite(led, i);
    delay(15);
  }
  for(int i = 255;i>0; i--){
    analogWrite(led, i);
    delay(15);
  }

}
