# LEDs and blinky things
## Light Emittinbg Diodes
A diode is a kind of electonic component that only allows electricity to flow in one drection. An LED is a diode that lights up when there is a voltage difference across its anode and cathode pins.

## LED basics
### Colors
There are a bunch of 'standard' LED colors, soem that are rarer, adn some that mix together really nicely. The color is made by either 1) the chemical compound on the substrate of the diode, 2) the clolor of the plastic shell around the electric compoents, 3) color mixing of several dies in one element.
The color of an LED will be centered on one wavelength, which is always going to be determined by the chemicals and the casing. 

### Uses
LEDs are used for illumination and indication. Illumination would be a flashlight or headlights on a car. Inbdication would be a status light of some sort.

### Powering
While LEDs require voltage to drive them, it's the amount of current going through them that determines how bright they will be. However, there is a minimum voltage that needs to be overcome.

## Addressable LEDs 
Many different kinds of addressabkel LEDs are out in the wild. We're going to look at three different stykles. Two of them rely on chips **inside** the LED, and the other relies on a *row-column scanning* technique called [charlieplexing](https://en.wikipedia.org/wiki/Charlieplexing).

### Charlieplexing an LED matrix
Before addressable LEDs became readily available, a multiplexing technique was often used to work with a grid of LEDs. Multiplexing has a bunch of different applications, including expanding the potential inputs or outputs from a microcontroller, but in this case, it's useful for contolling a large number of lights from relatively few pins. 

![charlieplexing led shcematic from https://2.bp.blogspot.com/-H0A3pQgq8k8/T6gRIxJbGeI/AAAAAAAAAI4/6XpWJLAinhA/s1600/Charlieplex3.png](https://2.bp.blogspot.com/-H0A3pQgq8k8/T6gRIxJbGeI/AAAAAAAAAI4/6XpWJLAinhA/s1600/Charlieplex3.png)

This replies on very rapid switching on and off of rows and columns. It used to be that one would have to manage this nonsense by yourself, or write code for a specifc driver chip. Now there are many Arduino libraries that deal with the specifics of chips and allow us to work in a more abstract way.

The led matrix we're looking at is the [Adafruit 9x16 matrix](https://www.adafruit.com/product/2974), which is being driven by an IC called [IS31FL3731](https://www.lumissil.com/assets/pdf/core/IS31FL3731_DS.pdf). It is a compact LED driver for 144 single LEDs that runs off the i2c (or Wire) protocol. The matrix gets power & ground and connects to a mcircoontroller's i2c clock and data lines. As this chip runs at 5V, you may need to use a logic level shifter to work with a 3.3V microcontroler like the nano 33 ble. The [driver board](https://www.adafruit.com/product/2946) for this has all the wiring with the IS31FL3731 chip, and uses the [Adafruit_IS31FL3731](https://github.com/adafruit/Adafruit_IS31FL3731) library.

The demo code shows you how to write valuse to the board, and [this code](../serial-sketches/led matrix control) shows you how to send serial data from p5 (so you get a low resolution video display).

### LEDs with drivers
We're using lights with either the WS2812B/SK6812 driver (aka [Neopixels](https://learn.adafruit.com/adafruit-neopixel-uberguide)) or the SK9822 chip (aka [Dotstars](https://learn.adafruit.com/adafruit-dotstar-leds/overview)). The Neopixles are cheaper but require precise timing and control signals (and need a logic level shifter), while the Dotstars are more expensive, but looser with the timing protocol. We'll look at both and set them up as test rigs. 