const serviceUuid = "6d9ed6d4-300f-4902-bcec-b3847f900a3e";
let myCharacteristic;
let slide;
let myBLE;

function setup() {
  myBLE = new p5ble();

  // Create a 'Connect' button
  const connectButton = createButton('Connect')
  connectButton.mousePressed(connectToBle);
  connectButton.position(15, 65);

  // Create a text input
  slider = createSlider(0, 255, 0);
  slider.position(15, 100);

}

function connectToBle() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);
  // Set the first characteristic as myCharacteristic
  myCharacteristic = characteristics[0];
}

function writeToBle() {
  const inputValue = slider.value();
  // Write the value of the input to the myCharacteristic
  myBLE.write(myCharacteristic, inputValue);
}

function mouseDragged() {
  writeToBle();
}


/*
ARDUINO CODE

// This example creates a BLE peripheral with service that contains a
// characteristic to control an LED.

#include <ArduinoBLE.h>

BLEService ledService("6d9ed6d4-300f-4902-bcec-b3847f900a3e"); // BLE LED Service

// BLE LED Switch Characteristic - custom 128-bit UUID, read and writable by central
BLEIntCharacteristic ledCharacteristic("19B10001-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite);

const int ledPin = 2; // pin to use for the LED

void setup() {
  Serial.begin(9600);
  //while (!Serial);

  // set LED pin to output mode
  pinMode(ledPin, OUTPUT);

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");

    while (1);
  }

  // set advertised local name and service UUID:
  BLE.setLocalName("LED");
  BLE.setAdvertisedService(ledService);

  // add the characteristic to the service
  ledService.addCharacteristic(ledCharacteristic);

  // add service
  BLE.addService(ledService);

  // set the initial value for the characeristic:
  ledCharacteristic.writeValue(0);

  // start advertising
  BLE.advertise();
}

void loop() {
  // listen for BLE peripherals to connect:
  BLEDevice central = BLE.central();

  // if a central is connected to peripheral:
  if (central) {
    // while the central is still connected to peripheral:
    while (central.connected()) {
      // if the remote device wrote to the characteristic,
      // use the value to control the LED:
      if (ledCharacteristic.written()) {
        int brightness = ledCharacteristic.value();
        analogWrite(ledPin, brightness);
      }
    }
  }
}

*/