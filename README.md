# animate-in-viewport
Current code is based on Elementor and Bricks. It could easily be adjusted for other environments 

With Elementor, an event is used for initialisation and the device type is detected using a data attribute on body, added by Elementor

With Bricks, breakpoint.css sets a body.content to a value based on the screen width. breakpoint.js defines a function that reads this value
Other than that, the code is generic. Also, it does not have any dependencies.

#### Elementor
Example Viewport animations
See https://youtu.be/lMDtCbgBSYo

Example with dispatched JS Events:
https://youtu.be/0HQ8DaamOVI

#### Bricks
Example: https://youtu.be/O6jr_ueA164

**NOTE: My code may have changed since these videos. They need to be redone but still demonstrate the usage.** 

## Usage
### Element Viewport Tracking
- Add the class 'vpa-track' to any element to track

This will by default have an active viewport of -20% from the top and bottom of the visible display.
When any part of the element is within this range it is considered to be "in View", otherwise it is "Out of View"

### Non-Element Viewport Tracking
- Add the class 'vpa-no-track' to any element to track

All the following settings and attributes are applied. The element is not tracked in the viewport. 
Trigger the state by calling public methods.
e.g.
<pre><code>
const vpa = window._VPA.viewportAnimation;
const el = document.getElementById('testElement');
vpa.setInView(el); //to play in animation
vpa.setOutOfView(el); //to play out animation
</code></pre>

### Customisation
#### Data Attributes 

For Elementor, use Settings->Advanced > "Attributes". Separate the attribute and value with a | (pipe).
E.g. data-io-top:200px

For Bricks, use Style -> Attributes

- data-io-top
  - Sets the top of viewport to trigger. Must be PX or %
- data-io-bottom
  - Sets the bottom of viewport to trigger. Must be PX or %
- data-event-prefix
    - Sets the prefix for all entry events. e.g. 'my-prefix' will create the event prefix my-prefix_

#### CSS Animation

See the example CSS rules or creat your own, add the class to the tracked Element. This will add the "in-view" and "out-of-view" classes to the tracked Element as appropriate.
Use this to set starting points and animations.

#### CSS Attributes

For Elementor, use Settings->Advanced > "Attributes". Use the attribute "style" | (pipe).
E.g. style| --delay: 1s; --scale-start: 0.1

CSS attributes are dependent on how the CSS if defined. Common CSS attributes include:
--out-delay: 0s;
--in-delay: 0s;
--transform-origin: 50% 50%;

    /* Transforms */
    --out-rotation: 0deg;
    --in-rotation: 0deg;
    --out-x-distance: 0;
    --in-x-distance: 0;
    --out-y-distance: 0;
    --in-y-distance: 0;
    --out-skew: 0;
    --in-skew: 0;
    --out-x-scale: 1;
    --in-x-scale: 1;
    --out-y-scale: 1;
    --in-y-scale: 1;
    
    --out-transform-duration: 0.7s;
    --in-transform-duration: 0.5s;
    --out-transition-timing: ease-out;
    --in-transition-timing: ease-in;

    /* Opacity */
    --out-opacity: 0;
    --in-opacity: 1;
    --out-opacity-duration: 0.5s;
    --in-opacity-duration: 0.5s;
    --out-opacity-timing: ease-in;
    --in-opacity-timing: ease-out;

**Note:** All attributes set here are automatically copied to the First Child Element. The reason being that the style does not have inheritance.
Animation classes are applied to the First Child of the tracked Element.

### Conditionals

For Elementor, use Settings->Advanced > "Attributes". Add the following data attributes to disable CSS animations or Events of different devices.

- data-mobile-disable-css
- data-mobile-disable-events
- data-tablet-disable-css
- data-tablet-disable-events
- data-desktop-disable-css
- data-desktop-disable-events

### Events

Unless disabled by any of the above attributes, an Event is dispatched on every entry/leave event. The Event is a CustomEvent dispatched on window.

Default Event names are: "track-view/in" and "track-view/out"

If "data-event-prefix" is defined ir is prepended. E.g.  "data-event-prefix|test" will become "test_track-view/in" and "test_track-view/out"

The CustomEvent:
`
const event = new CustomEvent(
type,
{
detail: entry
}
);
`
The "type" is the Event Name, "entry" is the IntersectionObserver entry property from the callback