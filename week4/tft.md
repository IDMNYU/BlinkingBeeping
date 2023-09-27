# TFT Screens & microcontrollers
![Closeup of a TFT screen from https://commons.wikimedia.org/wiki/File:LCD_TFT_Screen_Closeup.jpg](https://upload.wikimedia.org/wikipedia/commons/a/a4/LCD_TFT_Screen_Closeup.jpg?20100106212349)

## What is a TFT screeen anyhow?
A TFT LCD is a thin-film-transistor liquid-crystal display.  
![How a TFT screen works from https://www.crystalfontz.com/blog/rgb-and-color-depth/](https://www.crystalfontz.com/blog/wp-content/uploads/tft.svg)
Effectively, an LCD panel is a sandwich of liquid crystals (a funny type of matter that is, as the name implies, liquid and crystaline) and ploarized screens. When an electric current is passed through the crystals, they reorient themselves. By applying a variable voltage to each pixel element, the opacity of the pixel appears to change. When using this in conjunction with the various polarizing screens and color filters, every R/G/B triplet creates a single visual pixel. When mashed up closely in a dense screeen, we get the illusion of an image (when the right data is sent to the pixels).
Because this technology relies on polarized filters, sigeways angles often will seem to lose focus, look washed out, have low contrast, or seem to disappear.

## How do you use one?
TFT screens themselves are not generally driven directly by microcontrollers, it's a ton of wiring and relies on highly specific timing and commands; there's typically an intermediary device that takes data from the microcontroller and translates that to the commands a screen needs.
These driver boards have specific funxtionality baked into them for dealing with fonts, images, color, etc. The microcontroller's duty here is to send commands to the driver chip, which then does thw dirty work of sending data to the screen.
An example of a [TFT driver chip is the RA8875](https://www.raio.com.tw/en/RA8875.html). This chip has enough capacity to drive a TFT screen with greater resolution than an old-school NTSC television.

## When would you use one?
TFT screens are useful in a number of applications — displaying diagnostic information, sensor readings, debugging, showing images, acting as locations of graphic information... There's a lot of flexibility there. They come in handy anytime you need a project that could use a screen, but you donlt want to attach a full-ass computer just for display purposes.
I've seen them in IoT devices, smart home devices, flip phones, [belt buckles](https://www.instructables.com/The-Asteroid-Belt/), [shoes](http://www.theaphroditeproject.tv/), all kinds of crazy places.

## Gimme a demo!
![TFT Screen Demo](tft_accel.gif)

For this demo, I'm using an [Adafruit 1.14" 240x135 Color TFT Breakout LCD Display](https://www.adafruit.com/product/4383). This one is kinda nice as it not only has pretty vibrant color and a decent resolution, it also has a micr SD card reader attached, so you can show bitmap images on there too.
The screen has a 250x135 resolution, and is driven by a [ST7789 chip](https://www.rhydolabz.com/documents/33/ST7789.pdf). The chip communicates via SPI (Serial Perihiperal Interface) and requires power, ground, a SPI clock, MOSI, CS, DC, and reset connection.

In this example, I'm using the values from the Nano 33 BLE's built-in accelerometer to determine the position of a line drawn on the screen. This line will appear to stay foxed to the horizion, even as the board rotates on the x-axis. This example relies on a number of external libraries - SPI, Adafruit_GFX (to leverage the graphics libray), Adafruit_ST7789 (to communicate with the screen driver), and Arduino_LSM9DS1 (to communicate with the accelerometer).

Example code follows with a wiring diagram below.

```
// uses the nano's accelerometer values to calculate
// a line drawn on a TFT screen that always appears
// to be fixed at the horizion

#include <Adafruit_GFX.h>     // Adafruit graphics library
#include <Adafruit_ST7789.h>  // Hardware-specific library for ST7789
#include <SPI.h>              // SPI lib
#include <Arduino_LSM9DS1.h>  // accel lib
// set up the SPI pins
#define TFT_CS 10
#define TFT_RST 9
#define TFT_DC 8
// initialize the tft library
Adafruit_ST7789 tft = Adafruit_ST7789(TFT_CS, TFT_DC, TFT_RST);

// horizontal start and end positions
int yStart = 135 / 2;
int yEnd = 135 / 2;

// previous start and end positions
int oldEndY;
int oldStartY;

void setup(void) {

  tft.init(135, 240);  // Init ST7789 240x135
  tft.setRotation(1);   // rotate drawing axis

  if (!IMU.begin()) {   // init accelrometer, throw error if issue
    while (1)
      ;
  }
  // fixes SPI speed issue
  // tft.setSPISpeed(40000000);
  // black background
  tft.fillScreen(0x0000);
}

void loop() {
  float x, y, z; // accel returns a float -1.0 to 10.
  int xi; // an int version of the accel value

  // if there's data from the accel
  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(x, y, z); // read the value and store in the vars
    xi = x * 100; // calculate an int version of the values
  }
  // figure out the y start & end position for the the line
  // map the value to the height on either side of the TFT
  yStart = map(xi, 100, -100, 135, 0);
  yEnd = map(xi, 100, -100, 0, 135);

  // if there is a change
  // erase an old line by drawing over it in black
  // draw the new line. this is retained until there is a change
  if (oldStartY != yStart || oldEndY != yEnd) {
    tft.drawLine(0, oldStartY, 240, oldEndY, 0x0000);
    tft.drawLine(0, yStart, 240, yEnd, 0xF81F);
  }

  // update the end x/y positions
  oldStartY = yStart;
  oldEndY = yEnd;
}
```

![TFT Screen BB](tft_image.png)
