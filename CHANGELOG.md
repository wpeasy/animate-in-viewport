## v0.0.4
### Changes
This update is to treat uninitialized elements differently. We want the opacity to be 0 by default until the element has been initialised.

In the Elementor Editor we want the opacity to be 1.

<pre>/*General hide animation items until initialised */
.wpg-reanimate:not(.vpa-initalized){
  opacity:0;
}

/** For Elementor Editor */
body.elementor-editor-active .wpg-reanimate:not(.vpa-initalized){
  opacity:1;
}
</pre>

CSS should then treat the "out of view class as:
`.vpa-animation-name.vpa-initalized`

In view class as:
`.vpa-animation-name.vpa-initalized.in-view`

- JavaScript
  - Added 'vpa-initalized' class to tracked element after initialization

- CSS
  - Example CSS,  Adjusted to reflect the change

## v0.0.3
### Changes
- Changed main initialiser to 'elementor/frontend/init' so we can detect the device mode on the body tag
- Added Out of View Class to enhance CSS capabilities.
  - In View default class 'in-view'
  - Out of View Class 'out-of-view'
- Added data attributes to disable CSS animations and Events as needed
  - data-mobile-disable-css
  - data-mobile-disable-events
  - data-tablet-disable-css
  - data-tablet-disable-events
  - data-desktop-disable-css
  - data-desktop-disable-events

## v0.0.2
### Changes
- Changed animation selector to target teh tracked elements > *:first-child . This is to prevent re-triggering the IntersectionObserver when an animation translates the Y position.
- Added JS Events firing on enter and leave viewport

## v0.0.1 Initial Release

