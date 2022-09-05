# animate-in-viewport
Current code is based on Elementor. It could easily be adjusted for other environments 

An Elementor event is used for initialisation and the device type is detected using a data attribute on body, added by Elementor

Other than that, the code is generic. Also, it does not have any dependencies.

Example Viewport animations
See https://youtu.be/lMDtCbgBSYo

Example with dispatched JS Events:
https://youtu.be/0HQ8DaamOVI

**NOTE: My code had changed quite a bit since these videos. They need tobe redone but still demonstrate the usage.** 

## Usage
### Element Tracking
- Add the class 'wpg-reanimate' to any element to track

This will by default have an active viewport of -20% from the top and bottom of the visible display.
When any part of the element is within this range it is considered to be "in View", otherwise it is "Out of View"

### Customisation
#### Data Attributes 

For Elementor, use Settings->Advanced > "Attributes". Separate the attribute and value with a | (pipe).
E.g. data-io-top:200px

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
- --delay
- --opacity-start
- --opacity-end
- --opacity-duration
- --scale-start
- --rotate-start
- --transform-duration-in
- --transform-duration-out
- --transition-timing

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
The "type" is teh Event Name, "entry" is the IntersectionObserver entry property from the callback