# 555 Timer Monophonic Organ

Using a 555 chip, you're going to build an organ that will produce a different tone based off the button that is pressed.

![Organ Schematic](https://www.555-timer-circuits.com/images/circuit-toy-organ-schematic.gif)

## The finished product
![Organ BB](555_toy_organ_bb.png)

### Step 1 - the Breadboard
![Breadboard](10.png)

### Step 2 - the IC
Place the IC in the board with the dot facing the closest edge of the board
![Breadboard 555](09.png)

### Step 3 - power and ground
Connect pin 1 to ground and pin 8 to power
![555 power and ground](08.png)

### Step 4 - finish the chip wiring
Connect pin 7 to power throigh a 4.7k ohm resistor, and connect pin 4 to power
![555 power and ground](07.png)

### Step 5 - pull out a lead for a pot
bring a wire out from pin 7
![to the pot!](06.png)

### Step 6 - wire the pot 
add a 100k pot so one end connects to pin 7. bridge the center pin and the terminal connected to pin 7
![the pot!](05.png)

### Step 7 - add some switches 
Add your switches to the far end of the bb
![the switches!](04.png)

### Step 8 - make a resistor ladder 
Add 1.1k rersistors in series with each other connected to one terminal of the pot, ending with the termonal of one of the switches. Each resistor shpuld connect to two switches
![the resistors!](03.png)

### Step 9 - connnect pins 2 and 6 to the switches
connect pins 2 and 6 to the switches in parallel
![in parallel](02.png)

### Step 10 - add the capacitors
Connect a small ceramic cap (labeled 104) to ground and the junction of pins 2, 6, and the switches. Connect a polarized 100uf capacitor to the circuit with the anode (long leg) connected to pin 3 of the 555 and the other pin in an otherwise empty column 
![capacitors](01.png)

### Step 10 - add the speaker!
Connect one end of the speaker to the pin with the polarized capacitor, and the other end to ground
![speaker](00.png)

### Step 11 - add the power and press play!
Connect your battery to the bus rows and make some noise
![speaker](555_toy_organ_bb.png)