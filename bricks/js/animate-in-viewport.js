/*
NOTE: Requires Breakpoint CSS and Breakpoint JS
*/
;((w, d) => {
    const DEBUG = false; //Enable for console logging

    let trackingElementCollection, nonTrackingElementCollection;
    let observerCollection = []; //used to register observers so we can disconnect on window resize
    let deviceMode; //init() gets the device mode from the body element. This is Elementor Specific.

    const trackElementSelector = '.vpa-track';
    const nonTrackElementSelector = '.vpa-no-track';
    const initializedClass = 'vpa-initalized';
    const inViewClass = 'in-view';
    const outOfViewClass = 'out-of-view';
    const defaultTop = '-20%';
    const defaultBottom = '-20%';
    const trackViewEventName = 'track-view';

    w.addEventListener('DOMContentLoaded', () => {
        trackingElementCollection = d.querySelectorAll(trackElementSelector);
        nonTrackingElementCollection = d.querySelectorAll(nonTrackElementSelector);
        init();
    })



    //Clear observers on resize and reinitialise
    w.addEventListener('resize', () => {
        if (DEBUG) {
            console.info('### Track Viewport RESIZE ###')
        }
        observerCollection.forEach(o => {
            o.disconnect();
        });
        observerCollection = [];
        deviceMode = w._WPG.breakpoints.getBreakpointName();
        trackElements();
    })

    const trackElements = () => {
        trackingElementCollection.forEach(el => {
            trackElement(el);
        });
    }

    const parseSettingsToElementData = ()=>{
        if (DEBUG) {
            console.info('### Track Viewport PARSE SETTINGS ###')
        }
        const allElements = [...trackingElementCollection, ...nonTrackingElementCollection];
        allElements.forEach(element => {
            const conditions = {
                mobile: {
                    css: !element.hasAttribute('data-mobile-disable-css'),
                    events: !element.hasAttribute('data-mobile-disable-events')
                },
                tablet: {
                    css: !element.hasAttribute('data-tablet-disable-css'),
                    events: !element.hasAttribute('data-tablet-disable-events')
                },
                desktop: {
                    css: !element.hasAttribute('data-desktop-disable-css'),
                    events: !element.hasAttribute('data-desktop-disable-events')
                }
            }

            /*
                Generic event names to dispatch.
                With no Prefix:
                "track-view/in"
                "track-view/out"

                If the tracked element has a data-event-prefix attribute use that + '_'
                e.g. if [data-event-prefix="custom"] results in the names
                "custom_track-view/in"
                "custom_track-view/out"

                This enables very specific listeners for selected elements
            */
            const eventPrefix = element.dataset.eventPrefix ? element.dataset.eventPrefix + '_' : '';
            const inViewEventName = eventPrefix + trackViewEventName + '/in';
            const outViewEventName = eventPrefix + trackViewEventName + '/out';

            //Store my settings on the element
            const settings = {
                conditions: conditions,
                eventPrefix: eventPrefix,
                inViewEventName: inViewEventName,
                outViewEventName: outViewEventName
            }
            element.dataset.vpaSettings = JSON.stringify(settings);

            /* -----------
            Copy style attributed to first child to work with the new CSS targeting of the first child
            */
            const firstChild = element.querySelector('*:first-child');
            const style = element.getAttribute('style');
            if(style){ firstChild.setAttribute('style', style) };

            element.classList.add(initializedClass);
        })
    }

    /*
        @param type Name of the event
        @param data Intersection Observer entry
    */
    const dispatch = (type, entry) => {
        if (DEBUG) { console.log('Dispatch:', type) }
        const event = new CustomEvent(
            type,
            {
                detail: entry
            }
        );
        w.dispatchEvent(event);
    }

    const setInView = (element, entry) => {
        const settings = JSON.parse(element.dataset.vpaSettings);
        const {conditions, eventPrefix, inViewEventName, outViewEventName} = settings;
        if (conditions[deviceMode].events) {
            dispatch(inViewEventName, entry);
        }
        if (conditions[deviceMode].css) {
            element.classList.add(inViewClass);
            element.classList.remove(outOfViewClass);
        }
    }

    const setOutOfView = (element, entry) => {
        const settings = JSON.parse(element.dataset.vpaSettings);
        const {conditions, eventPrefix, inViewEventName, outViewEventName} = settings;
        if (conditions[deviceMode].events) {
            dispatch(outViewEventName, entry);
        }
        if (conditions[deviceMode].css) {
            element.classList.remove(inViewClass);
            element.classList.add(outOfViewClass);
        }

    }

    const trackElement = element => {
        /* -----------
        Observer and dispatcher setup
        */
        const top = element.dataset.ioTop ? element.dataset.ioTop : defaultTop;
        const bottom = element.dataset.ioBottom ? element.dataset.ioBottom : defaultBottom;
        const rootMargin = top + ' 0px ' + bottom + ' 0px';

        let options = {
            root: null,
            rootMargin: rootMargin,
            threshold: 0.00001
        }

        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                /*console.log(entry);*/
                if (entry.isIntersecting) {
                    setInView(element, entry);
                } else {
                    setOutOfView(element, entry);
                }
            });
        }, options);
        observer.observe(element);
        observerCollection.push(observer);
    }

    const init = () => {
        if (DEBUG) {
            console.info('### Track Viewport INIT ###')
        }
        deviceMode = w._WPG.breakpoints.getBreakpointName();
        parseSettingsToElementData();
        trackElements();
    }

    //public methods
    if(w._WPG === undefined) {w._WPG = {}}
    w._WPG.viewportAnimation = {
        setInView: setInView,
        setOutOfView: setOutOfView
    }


    if (DEBUG) {
        w.addEventListener("track-view/in", e => {
            console.log('in:', e.detail);
        });

        w.addEventListener("track-view/out", e => {
            console.log('out:', e.detail);
        });
    }
})(window, document);