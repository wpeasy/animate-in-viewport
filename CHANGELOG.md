## v0.0.1 Initial Release

##v0.0.2
### Changes
- Changed animation selector to target teh tracked elements > *:first-child . This is to prevent re-triggering the IntersectionObserver when an animation translates the Y position.
- Added JS Events firing on enter and leave viewport

##v0.0.3
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

