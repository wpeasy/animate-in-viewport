## v0.07
### Changes

- Changed class names for tracking
  - vpa-track - For items that will be tracked
  - vpa-no-track - for items that will not be tracked

### Additions

- Added class for non tracked items. This is so teh same animation classes and attributes can be used, triggered manually instead of by Viewport tracking.
- Added public object on Window "_VPA" which exposes two methods
  - setInView(DOMElement)
  - setOutOfView(DOMElement)

## v0.0.7
### Additions

- Added animation class
  - vpa-underline


## v0.0.6
### Additions

- Added animation class 
  - vpa-highlighter
  - vpa-box-reveal

## v0.0.5
### Fixes

- Fixed: Animations on first screen paint showing partial "Out" animation. Adjusted sample CSS

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

