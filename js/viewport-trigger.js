;((w, d) => {
    const DEBUG = false; //Enable for console logging
    const body = document.body;

    let targetElementCollection;
    let observerCollection = []; //used to register observers so we can disconnect on window resize
    let deviceMode; //init() gets the device mode from the body element. This is Elementor Specific.

    const targetElementSelector = '.wpg-reanimate';
    const initializedClass = 'vpa-initalized';
    const inViewClass = 'in-view';
    const outOfViewClass = 'out-of-view';
    const defaultTop = '-20%';
    const defaultBottom = '-20%';
    const trackViewEventName = 'track-view';

    w.addEventListener('DOMContentLoaded', ()=>{
        targetElementCollection = d.querySelectorAll(targetElementSelector);
    })

    w.addEventListener('elementor/frontend/init', () => {
        init();
    })

    const init = () => {
        if(DEBUG) { console.info('### Track Viewport INIT ###')}
        targetElementCollection.forEach(el => {
            initElement(el);
        });
    }

    //Clear observers on resize and reinitialise
    w.addEventListener('resize', ()=>{
        if(DEBUG) { console.info('### Track Viewport RESIZE ###')}
        observerCollection.forEach( o =>{
            o.disconnect();
        });
        observerCollection = [];
        init();
    })

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

    const initElement = element => {
        /*
        Set condition flags from data Attributes
        */
        const conditions = {
            mobile :{
                css: !element.hasAttribute('data-mobile-disable-css'),
                events: !element.hasAttribute('data-mobile-disable-events')
            },
            tablet : {
                css: !element.hasAttribute('data-tablet-disable-css'),
                events: !element.hasAttribute('data-tablet-disable-events')
            },
            desktop : {
                css: !element.hasAttribute('data-desktop-disable-css'),
                events: !element.hasAttribute('data-desktop-disable-events')
            }
        }

        deviceMode = body.dataset.elementorDeviceMode;

        /* -----------
        Observer and dispatcher setup
        */
        const top = element.dataset.ioTop ? element.dataset.ioTop : defaultTop;
        const bottom = element.dataset.ioBottom ? element.dataset.ioBottom : defaultBottom;
        const rootMargin = top + ' 0px ' + bottom + ' 0px';

        /*
            Generic event names to dispatch.
            With no Prefix:
            "track-view/in"
            "track-view/out"

            If the tracked element has a data-prefix attribute use that + '_'
            e.g. if [data-event-prefix="custom"] results in the names
            "custom_track-view/in"
            "custom_track-view/out"

            This enables very specific listeners for selected elements
        */
        const eventPrefix = element.dataset.eventPrefix ? element.dataset.eventPrefix + '_' : '';
        const inViewEventName = eventPrefix + trackViewEventName + '/in';
        const outViewEventName = eventPrefix + trackViewEventName + '/out';

        let options = {
            root: null,
            rootMargin: rootMargin,
            threshold: 0.0001
        }

        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                /*console.log(entry);*/
                if (entry.isIntersecting) {
                    if(conditions[deviceMode].events) { dispatch(inViewEventName, entry); }
                    if(conditions[deviceMode].css) {
                        element.classList.add(inViewClass);
                        element.classList.remove(outOfViewClass);
                    }
                } else {
                    if(conditions[deviceMode].events) { dispatch(outViewEventName, entry); }
                    if(conditions[deviceMode].css) {
                        element.classList.remove(inViewClass);
                        element.classList.add(outOfViewClass);
                    }
                }
            });
        }, options);
        observer.observe(element);
        observerCollection.push(observer);

        /* -----------
        Copy style attributed to first child to work with the new CSS targeting of the first child
        */
        const firstChild = element.querySelector('*:first-child');
        const style = element.getAttribute('style');
        firstChild.setAttribute('style', style);

        element.classList.add(initializedClass);
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