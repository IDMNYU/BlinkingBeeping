# Switches
The switch is about as basic a sensor as you can get. As such, it’s easy to overlook their versatility, use, and gloss over the different kinds of switches that are out there. They are best for detecting presence. They provide the answer to the question "Is something there or not?"

But before discussing different types of switches and how they operate, let’s see what a switch does.

These simple components control if a given circuit is open or closed. They allow current to flow through them when closed, and they keep that from happening when they are open. They’re super useful for user interaction and control systems.

!(https://www.gaugemasterretail.com/media/rightlines/switch01.jpg)

Switches have 2 states, on and off. When they are off, it’s like leaving a gap in a circuit. When they are on, they close the circuit, letting electricity flow to the rest of the system.

## Characteristics of switches

Generally, we can break switches into 2 groups : momentary and maintained.

Think of momentary switches like buttons. It’s only active as long as you’re pressing it. These are most commonly used for user input (move up, change color, change the song). Arcade buttons, the small buttons we use in our breadboards, keypads, most anything with a nice “clicky” feel is probably a momentary switch. They come in all shapes and sizes.  Reed switches and those which activate through magnetism are also momentary switches. Take the magnetic field away from the switch, and it opens up.

Maintained switches stay in their state until you change it to something else. Light switches are examples of this. Power on/off, or toggles for different functionality are ideal uses. Common types include DIP switches, toggles slide switches, and latching buttons.

Switches are actuated in a number of ways. This depends on the kind of switch we’re using. Pushing, sliding, rocking, pilling, turning, heating, magnetizing, etc.

## NO vs NC

Momentary switches will sometimes refer to themselves as normally open or normally closed. This refers to the default state of the switch. Usually, we find momentary switches as NO, that is, when they are not active, they do not complete the circuit. NC means that it will complete the circuit unless it is being pressed. You’ll often find this sort of make up in a relay (a type of electrically controlled switch, often using electro magnetism)

## Poles and throws

Sometimes you’ll encounter a maintained switch that is labeled SPST or DPST. These refer to the switch’s number of states (throws) and how many terminals it has (poles).

The number of poles describes how many circuits a switch can control.

The throws describe how many positions each pole can be in.

For example — SPST (single pole, single throw) has one input, and one output. It will be closed or open. Most momentary switches work this way. With a maintained switch, a SPST can work as a simple power on/off.

A SPDT (single pole, dual throw) switch has three terminals. One common pin, and 2 others that the switch goes back and forth between. These can swap inputs (either / or) or switch between 2 power supplies (battery vs solar). If you leave one pole disconnected, this will also act as a SPST.

These can rapidly expand to different kinds of interaction depending on the number of poles and throws.