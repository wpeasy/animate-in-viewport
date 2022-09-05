;((w, d) => {
    const DEBUG = false; //Enable for console logging

    let targetElementCollection;
    const targetElementSelector = '.wpg-reanimate';
    const inViewClass = 'in-view';
    const defaultTop = '-20%';
    const defaultBottom = '-20%';
    const trackViewEventName = 'track-view';

    w.addEventListener('DOMContentLoaded', () => {
        init();
    })

    const init = () => {
        targetElementCollection = d.querySelectorAll(targetElementSelector);
        targetElementCollection.forEach(el => {
            initElement(el);
        });
    }

    /*
        @param type Name of the event
        @param data Intersection Observer entry
    */
    const dispatch = (type, data) => {
        if (DEBUG) {
            console.log('Dispatch:', type)
        }
        const event = new CustomEvent(
            type,
            {
                detail: data
            }
        );

        w.dispatchEvent(event);
    }

    const initElement = element => {
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
        const eventPrefix = element.dataset.eventPrefix ? element.dataset.eventPrefix.trim() + '_' : '';
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
                    dispatch(inViewEventName, entry);
                    element.classList.add(inViewClass);
                } else {
                    dispatch(outViewEventName, entry);
                    element.classList.remove(inViewClass);
                }
            });
        }, options);
        observer.observe(element);
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