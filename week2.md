# Week 2 - Friday February 7
* Discuss readings
* Sign up for presentations
* Electricity basics
  * series v parallel
  * multimeters and other tools
  * Ohm's Law
* buttons and switches


Computers are great adding machines. They’re also great at comparing things that usually don’t work well together. Last week, we looked at [Jim Campbell's animation](http://jimcampbell.tv/portfolio/miscellaneous_references/) about various types of inputs and outputs. Thanks to the magic of miocrocontrollers, we can get away from the mouse, monitor, keyboard (and the now ubiquitous touchscreen) to think differently about these machines we use all the time.

At the end of the day, all we’re doing with a circuit is wrangling electrons. These little buggers want to move from a place of higher potential energy (often referred to as power) to a place of lower potential energy (often called ground). Some analogies for how electricty works in a circuit involve [water](https://learn.sparkfun.com/tutorials/voltage-current-resistance-and-ohms-law/voltage), rocks, or buses. Because we only learned that electrons are negatively charged after we gave the names positive and negative to these things, [there's a diference in how physicists and engineers (and most folks) describe this phenomena](https://tbm.idm.hosting.nyu.edu/wp-content/uploads/2019/01/2007_Bek_Introduction-into-documentation-of-kinetic-art-english.pdf).

When we describe electrical characteristics, we talk about voltage (measured in Volts), current (measured in Amps or Amperes), and resistance (measured in Ohms). Voltage is like the force of the electricity, the current is the amount of electricity, and resistance pushes back against the flow. 

_Ohms Law_ (V=I*R) is useful in theory, but not so much for day to day use. What is more interesting, is that electricity is like a college student in that it follows the path of least resistance.

We always want our circuits to have some sort of work for the electrons to do. This can be busywork (like a resistor), or actual work (like an LED), or behind the scenes work (operating logic gates). Without something to do, electrons get bored and start fires (aka short circuits). All voltage gets used up in a circuit, which is why you can’t bring your DVD player to France.

https://vimeo.com/76442432

For us, right now, it lets us know that we can’t just stick one of our LEDs into a 5V rail without it blowing up.

https://vimeo.com/78674965

We can use schematics to identify various components

https://vimeo.com/90534363

Breadboards are our canvas. They’re the best. They allow us to change circuits quickly and easily. Underneath the plastic insulation, there are metallic strips that form connections which carry electricity. See what’s inside a breadboardfor more.

Soldering is going to become your best bet at keeping things in place. [Adafruit has an excellent guide to soldering.](https://learn.adafruit.com/adafruit-guide-excellent-soldering)

While we’re working with DC, there’s also AC. But don’t go there.
https://learn.sparkfun.com/tutorials/alternating-current-ac-vs-direct-current-dc/all
https://learn.sparkfun.com/tutorials/alternating-current-ac-vs-direct-current-dc/all?print=1

Turn the Arduino into an expensive power supply to light up your LED.

This circuit is in series


Each of the following are in parallel



Multimeters are great tools for figuring out what is going on inside a circuit. Adafruit has avery nice tutorial on how to use one.

Now that you have used a switch out of the box,make your own. [Here is a great example of how you should be thinking about the exercise for the week.](https://itp.nyu.edu/~tlc345/blog/mustache-switch/)


* Readings- 
  * Read prologue and Ch 1 of the Design of Everyday Things
* Assignment
  * Make a switch that you can control without using your hands. Document it on your site with a blog post. Write about what you are acomplishing here with this new kind of switch. Save this for next week, you'll use it again!
