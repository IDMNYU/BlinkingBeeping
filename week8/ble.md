# BLE communication with a microcontroller
## Intro
Bluetooth is great for local wireless communication. It has an idealized range of 10 meters, but real world conditions can reduce that signifigantly (size and placement of antenna, physical or other wireless interference, etc.). 

Bluetooth 4.0, aka Bluetooth Low Energy (BLE), made some signfifgant changes to how it works with the benefit of it needing less electrical consumption. 

To use the BLE capabilities of your mcirocontrollwer (that's the Nano BLE 33), you'll want to install the [Arduino BLE library](https://www.arduino.cc/reference/en/libraries/arduinoble/). [This tutorial can walk you through installing libraries](https://docs.arduino.cc/software/ide-v2/tutorials/ide-v2-installing-a-library) if you're unclear how to do so.

## About BLE
BLE devises are either _central_ or _peripherals_. Peripheral devices offer services that central devices can receive. My watch is a perihiperal that connects to my phone, which acts as a central device.

Peripherals have _services_ which have _characteristics_. Characteristics have _values_, which central devices can _read_, _write_, or _subscribe_ to.  My watch, for example, may have a "health" service, which has "pulse", "sleep", and "steps" characteristics.

Read and write operations are requested by a central device while a peripheral responds (or acknowledges). Subscribing to a characteristic allows the peripheral to notify a central device that a value has changed.

![bulletin board model of BLE communication from Arduino](https://raw.githubusercontent.com/arduino-libraries/ArduinoBLE/master/docs/assets/ble-bulletin-board-model.png)

BLE services, characteristics, and devices have _Universally Unique Identifiers_ or _UUIDs_. These are 128-bit numbers that uniquely describe each of these components. While [some UUIDs are reserved for particular functions](https://www.bluetooth.com/specifications/assigned-numbers/), you will generlaly want to roll your own. You can generate UUIDs with the [Online UUID Generator](https://www.uuidgenerator.net/).

## Process of using BLE
A central device initiates a connection after it discovers a peripherial which is advertising its services. 

On the peripheral side, you will want to 
* Set the name
* Establish services
* Add characteristics to services
* Start advertising the services to any central devices

On the central side, you'll 
* Scan and connect to a peripheral
* Check for services
* Check for characteristics
* Read, write, or subscribe to characteristics

You can use an application like [lightBlue](https://punchthrough.com/lightblue/) for iOS or Android, [Blue See](https://apps.apple.com/us/app/bluesee-ble-debugger/id1336679524?mt=12) for macOS or [BLE Analyzer](https://www.acrylicwifi.com/en/bluetooth-analyzer/) for Windows. These will allow you to scan for any BLE peripherals and connect to any advertised services and are quite useful for debugging. 

## First steps
* [Open this sketch](https://gist.github.com/shfitz/71961eef491a0921f74b4051711c07e1). It allows you to control the brightness of an LED on Pin 2 LED from a central device. To demo, we'll first use a central app like BlueSee. 
* The sketch first sets a service and characteristic UUID. If youre doing this in the lab, or in class, generate a unique UUID for the service and characteristic.
* In setup(), you name the service (maybe change this too, so you knwo it's yours), add characteristics, and start advertisting.
* In loop(), you wait for a connection from a central device.
* Your scanner may be able to send hex, ASCII, or bytes to the connected device. 

## Connecting to p5.js
There is a [p5js ble library](https://itpnyu.github.io/p5ble-website/) that allows Chrome to connnect to BLE devices. You can include the librsry in an index.html file like so : 

```HTML
<script
  src="https://unpkg.com/p5ble@0.0.7/dist/p5.ble.js"
  type="text/javascript"
></script>
```

[This p5 example](code/ble-examples) will allow you to connect to a browser and change the brightness of the LED with a slider.