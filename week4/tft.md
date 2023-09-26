# TFT Screens & microcontrollers

## What is a TFT screeen anyhow?
A TFT LCD is a thin-film-transistor liquid-crystal display.  
Effectively, an LCD panel is a sandwich of liquid crystals (a funny type of matter that is, as the name implies, liquid and crystaline) and ploarized screens. When an electric current is passed through the crystals, they reorient themselves. By applying a variable voltage to each pixel element, the opacity of the pixel appears to change. When using this in conjunction with the various polarizing screens, it creates a specifci color. When mashed up closely in a dense screeen, we get the illusion of an image (when the right data is sent to the pixels).
Because this technology relies on polarized filters, sigeways angles often will seem to lose focus, look washed out, have low contrast, or seem to disappear.

## How do you use one?
TFT screens themselves are not generally driven directly by microcontrollers, it's a ton of wiring and relies on highly specific timing and commands; there's typically an intermediary device that takes data from the microcontroller and translates that to the commands a screen needs.
These driver boards have specific funxtionality baked into them for dealing with fonts, images, color, etc. The microcontroller's duty here is to send commands to the driver chip, which then does thw dirty work of sending data to the screen.
An example of a [TFT driver chip is the RA8875](https://www.raio.com.tw/en/RA8875.html). This chip has enough capacity to drive a TFT screen with greater resolution than an old-school NTSC television.

## When would you use one?
TFT screens are useful in a number of applications — displaying diagnostic information, sensor readings, debugging, showing images, acting as locations of graphic information... There's a lot of flexibility there. They come in handy anytime you need a project that could use a screen, but you donlt want to attach a full-ass computer just for display purposes.
I've seen them in IoT devices, smart home devices, flip phones, [belt buckles](https://www.instructables.com/The-Asteroid-Belt/), [shoes](http://www.theaphroditeproject.tv/), all kinds of crazy places.

## Gimme a demo!
For this demo, I'm using an [Adafruit 1.14" 240x135 Color TFT Breakout LCD Display](https://www.adafruit.com/product/4383). This one is kinda nice as it not only has pretty vibrant color and a decent resolution, it also has a micr SD card reader attached, so you can show bitmap images on there too.
The screen has a 250x135 resolution, and is driven by a [ST7789 chip](https://www.rhydolabz.com/documents/33/ST7789.pdf). The chip communicates via SPI (Serial Perihiperal Interface) and requires power, ground, a SPI clock, MOSI, CS, DC, and reset connection.
