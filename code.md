# Notes on Code

We've written previously about how awesome computers are at reconfiguring themselves to do different things. This was manifest in pins on the microcontroller that we could change the behavior of through software.

What we were lacking in this model though, something that we possess, is a sense of memory. Our programs so far forget things as soon as we’re done with them. It’s not a very efficient method, like buying a new water bottle everytime you wanted a drink. Instead, let’s save the planet and use something over and over again. In programming, the tool we can use for this is a variable.

A variable, as its name implies, can change over time. This variance allows us to do all sorts of fun things not just in the moment, but by projecting into the future, and looking back to the past. We’ll look at how we can use variables in the context of our digital switches to start.

Code is an abstraction the computer’s language to a more human language. Abstracting this even further, we can break apart the computer’s process in our native tongue, then slowly transcribe this into code.

For example : “After pressing the button three times, blink the LED.”

This is a seemingly simple and straightforward thing, but there a number of discrete steps that need to be accomplished. Writing out all the steps like this is called “pseudo-code”

“Set one pin to be an input, and another to be an output. There’s a light attached to the output pin that is off to start. Create a variable to keep track of the button presses. Count the number of times the input pin is pulled high. when the pin goes high, add one to the variable’s number. When the variable equals ‘4’, turn the output on and off, and reset the variable to 0.”

While there’s a lot to unpack in there, we wind up with code that looks like this when done :
```C++
// declare global variables
int counter = 0;
int prevSwitchState = LOW;

void setup() { // configure pins
  pinMode(2, INPUT); pinMode(3, OUTPUT); // set initial pin state
  digitalWrite(3, LOW);
}

void loop() { // read the state of the switch into a local variable:
  int currentSwitchState = digitalRead(2); // compare current switch state to the previous state
  // if it is different and the current state is HIGH
  if (currentSwitchState != prevSwitchState && currentSwitchState == HIGH) {
    // add one to the counter
    counter++;// or counter=counter+1;
  }// evaluate the number of presses
  if (counter == 4) { // blink the LED:
    digitalWrite(3, HIGH);
    delay(100);
    digitalWrite(3, LOW);
    delay(100);
    digitalWrite(3, HIGH);
    delay(100);
    digitalWrite(3, LOW);
    delay(100);
    digitalWrite(3, HIGH);
    delay(100);
    digitalWrite(3, LOW);
    delay(100);
    digitalWrite(3, HIGH);
    delay(100);
    digitalWrite(3, LOW);
    delay(100); // reset the counter
    counter = 0;
  }
  // set the last switch state to the current one
  // for the next time through the loop
  prevSwitchState = currentSwitchState;
}
```
There are a couple things that need to be done with variables to use them. First, you need to declare the data type (what kind is it?), initialize it (what’s it called? does it have an initial value?), then make changes (vary it).

The kinds of variables we use in Arduino are probably going to be limited to [boolean](https://www.arduino.cc/en/Reference/BooleanVariables), [byte](https://www.arduino.cc/en/Reference/Byte), [int](https://www.arduino.cc/en/Reference/Int), [long](https://www.arduino.cc/en/Reference/Long), & [char](https://www.arduino.cc/en/Reference/Char). More often than not, you’ll be using an `int`. This will hold most all the information you need.

* boolean : 2 values, true or false (1 or 0) (2 bits)
* byte : 256 values (8 bits , or 1 byte)
* char : 256 values, expressed as a letter (8 bits , or 1 byte) )
* int : -32,768 to 32,767 (16-bits , or 2 bytes)
* long : -2,147,483,648 to 2,147,483,647 (32-bits or 4 bytes)

A bit is a 0 or 1. it’s the smallest unit of measurement in a computer. We string these together in a computer’s memory to make larger numbers. This binary notation (2 to the power of something) allows computers to store values larger than 0 or 1.

You _declare_ a variable like this :

```C++
int sensorNum;
int sensorThreshold=666;
```

In the first instance, you’re not giving it an initial value. Arduino will give it a 0. In the second instance, you’re saying “sensorThreshold equals six-hundred-sixty-six, until the program or I tell it to change.”

The names can be anything that start with a letter and contain no spaces. They should be informative, and it’s usually helpful to camelHump them. Variables can also be used to name items like pins, so that you have easily identifiable names for things.

[Variables have scope](https://www.arduino.cc/en/Reference/Scope), in that some are global, and available anywhere in your program, while others are local, and can only be seen by functions in which they are declared. Global variables are declared at the top of your program. Local variables are declared inside a function or loop.