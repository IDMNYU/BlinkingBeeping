#Electronic Cheat Sheet

##Electricity Basics
* Electricity is the flow of negatively charged electrons through a given material (usually copper wire or another conductor). We use this natural phenomenon to power a variety of devices and circuits.
* Electricity can be harnessed and converted, used to create light or motion, to transfer data and communicate between systems.

##AC / DC
* AC – Alternating Current
   * Current oscillates.
   * fantastic for long distances/ high voltage / current applications
   * Supplied from the electricity grid through wall outlets.
     * In the US, AC is rated at 110/120 volts, and 60 Hertz
     * In the UK, EU and other countries, it’s rated at 220/240 volts at 50Hz
     * A list of all variations can be found here : https://www.school-for-champions.com/science/ac_world_volt_freq_list.htm
   * Used to electrocute elephants
DC – Direct Current
Current flows in one direction.
Typically the end of the line
Most commonly found in day-to-day objects: battery powered tools, handheld and consumer electronics.
Some devices — incandescent light bulbs, certain motors, heating elements — operate directly from AC current. Others (like many consumer electronics) accept AC current but translate it internally into DC current. Still others can only accept DC current.
Ohms Law
V=IR — The foundational equation for how to calculate the different properties of a circuit: voltage, current, and resistance.  
Voltage is the difference in charge between two points.
Current is the rate at which charge is flowing.
Resistance is a material’s capacity to resist the flow of charge (current).
Ohms Law becomes relevant when building a circuit, but also when troubleshooting a circuit. For example:  identifying whether the voltage being supplied to a circuit is being used in its entirety and/or if any excess is being absorbed by the appropriate resistors.
What is a circuit?
Circuits are closed loops that allow electricity to flow from a point of higher potential energy, such as a the positive lead on a battery, to a lower potential, through a load like a lightbulb.
They control the movement of electricity in service of a specific purpose or outcome through assemblies of electrical components.
The key components of safe and effective circuitry include:
Understanding how to make sure that power flows correctly (and in its entirety) from an electrical source/power supply to a chosen output like a lightbulb or sound device.
The necessity that circuits be complete (closed) in order to function.
Understanding what causes short circuits and how to avoid them.
Three things to remember about circuits
All voltage is used in a circuit
Electricity will follow the path of least resistance
The amount of current flowing into a spot in a circuit is the same that flows out
Power vs Signal
Electricity can be used to power a device or to create a signal. Examples of a power: to run a motor, turn on a lightbulb, etc.)
a signal is a method of communication between devices, for example between 2 integrated circuits
Circuits created for these different purposes share many things in common, but also have unique requirements. When creating a signal, elements like frequency and noise become important. Different materials may be used to construct (and different tools may be used to test) a power circuit as opposed to a signal circuit.
Power Supplies
The source of electricity for your device/installation
Could be batteries, wall worts, solar, wind, electro-magnetic in origin
power for work could be either AC or DC
Power supplies come in great variety and it is essential to identify the appropriate supply for a specific device.
Key Components of a power supply:
Voltage and Current
AC/DC
Polarity
Polarity
Polarity indicates whether a circuit component is symmetric or not. A non-polarized (symmetric) component can be connected in any direction and still function the way it’s supposed to function. A polarized component can only be connected to a circuit in one direction. If connected in the wrong orientation, at best it won’t work as intended. At worst, it will smoke/spark/die.
A common AA battery is a simple example of a polarized component: with positive and negative terminals that must be correctly aligned for it to function. Polarized elements in a circuit can be much more complicated though, with multiple connection points that each have a unique function and position.
Tools of the Trade
How to Use a Multimeter
A multimeter is multifunctional tool that can measure voltage, amperage, resistance, and continuity across a given component.
How to use an oscilloscope
An oscilloscope allows use to visualize the waveform of a given signal over time. We can use it to detect amplitude, frequency, and any potential inconsistencies.
Breadboarding
Breadboards offer the opportunity to prototype a circuit before constructing it in a more permanent form. 
Components of circuit building

power supplies
These will provide power for the work. Typically plugged into a wall
regulators
a type of component that drops voltage across its pins. the excess is released as heat. A 7805 regulator, will drop the voltage in a circuit to 5V
resistors
resist the flow of electrical energy. Used to limit current and drop voltage.
measured in ohms, you can determine the amount of resistance with a multimeter, or using a resistor color calculator
never polarized
capacitors
components that store and discharge electricity over time. They are often used to smooth out irregularities in current and voltage.
measured in farads, the amount of capacitance can vary and come in a wide variety of shapes and sizes
some are polarized, others are not
motors
steppers
brushless DC motor
solenoids
linear actuators that operate along the same principles as motors.
relays
a relay uses an electromagnet to open or close a switch. They make really fun clicking noises and are often used to control high voltage/high current circuits from a smaller, safer one
transistors
solid state switches used to amplify signals and power
diodes
polarized components that make sure electricity only flows in one direction. useful in AC circuits, or in DC circuits when using an inductive load like a motor
LEDs
the most fun diodes. they are polarized components that emit light when voltage is applied
switches
used to control the flow of electricity in a circuit. There are many shapes, sizes and kinds. The small pushbutton ones we have are momentary, but there are also latched ones that work like a lightswitch in that they hold their position.
Series vs. Parallel circuits
If components in a circuit are in series, there is only one path for current to flow through them.  
In parallel circuitry, current can take multiple paths between elements/components.
Schematics
A Schematic is a map of how to properly connect a given circuit. Symbols represent various components (like resistors, capacitors, switches, ics, and power sources)  and lines represent connections between those components.
