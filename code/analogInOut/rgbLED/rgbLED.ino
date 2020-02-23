/* 
 *  RGB LED Color loop
 *  in this circuit a common anode LED is conencted to 5V
 *  with an Arduino Nano Every, pins 2, 3, and 5 are
 *  connected in series to a 220 ohm resistor throgh the R, G, and B pins
 *  based in aprt off some old code from Clay Shirky
 */

const int blue = 2; // blue leg conected to pin 2 in series with a 220 ohm resistor
const int green = 3; // blue leg conected to pin 3 in series with a 220 ohm resistor
const int red = 5; // red leg conected to pin 5 in series with 220 ohm resistor

// variables for LED brightness
// becsause the LED I used was commom anode
// the values are inverted from what you wouid typically
// use. ex. - a value of 255 is off,
// and a value of 0 is full brightness
int rVal = 255;
int gVal = 255;
int bVal = 255;

// a counter to move through the various values
int counter = 0;

void setup() {
  // set up the pins as putputs
  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);
}

void loop() {
  // fade theough all the colors of a RGB LED

  if (counter < 341) {
    int locVal = (counter * 3) / 4; // Normalize to 0-255

    rVal = 256 - locVal;  // Red from off to full bright
    gVal = locVal;        // Green from full to off
    bVal = 1;             // Blue on
  } else if (counter < 682) {
    int locVal = ( (counter - 341) * 3) / 4; // Normalize to 0-255

    rVal = 1;            // Red on
    gVal = 256 - locVal; // Green from off to full bright
    bVal = locVal;       // Blue from full bright to off
  } else {
    int locVal = ( (counter - 683) * 3) / 4; // Normalize to 0-255

    rVal = locVal;       // Red from full bright to off
    gVal = 1;            // Green on
    bVal = 256 - locVal; // Blue from off to full bright
  }
  // Write values to LED pins
  analogWrite(red, rVal);
  analogWrite(green, gVal);
  analogWrite(blue, bVal);
  
  // increment counter
  counter++;
  if (counter >= 1024) counter = 0; // reset as needed

  // brief pause to see changes
  delay(15);

}
