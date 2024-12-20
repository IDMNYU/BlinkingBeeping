
int firstSensor = 0;   // first analog sensor
int secondSensor = 0;  // second analog sensor
int thirdSensor = 0;   // digital sensor
int inByte = 0;        // incoming serial byte

void setup() {
  // start serial port at 9600 bps and wait for port to open:
  Serial.begin(9600);
  // while (!Serial) {
  //   ;  // wait for serial port to connect. Needed for native USB port only
  // }

  pinMode(2, INPUT_PULLUP);   // digital sensor is on digital pin 2
  establishContact();  // send a byte to establish contact until receiver responds
}

void loop() {
  // if we get a valid byte, read analog ins:
  if (Serial.available() > 0) {
    // get incoming byte:
    inByte = Serial.read();
    // read first analog input:
    firstSensor = analogRead(A7);
    // read second analog input:
    secondSensor = analogRead(A6);
    // read switch
    thirdSensor = digitalRead(2);
    // send sensor values:
    Serial.print(firstSensor);
    Serial.print(",");
    Serial.print(secondSensor);
    Serial.print(",");
    Serial.println(thirdSensor);
  }
}

void establishContact() {
  while (Serial.available() <= 0) {
    Serial.println("0,0,0");  // send an initial string
    delay(300);
  }
}
