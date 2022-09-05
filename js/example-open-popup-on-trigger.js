/*
Example is based on Elementor PRO Popup
The Tracked element having the "data-event-prefix|popup" set the Widget->Settings->Advanced : Attributes
 */
;((w,d) => {
    const myPopupId = 11592;
    w.addEventListener('elementor/frontend/init', ()=>{
        w.addEventListener('popup_track-view/in', e => {
            elementorProFrontend.modules.popup.showPopup( { id:myPopupId });
        });

        w.addEventListener('popup_track-view/out', e => {
            /* Elementor popups dont\'t have the same "Close" function as Open.
                closePopup(settings,event)  closes the popup from the event.target which is automatically set
                by the Event dispatch. Elementor looks up the DOM for the popup, therefore, teh event must trigger from
                within the popups element tree.
                To get around this, we create a dummy object, find the first element inside the popup and set that as the target attribute
                NOTE: This code is based on Sections, you may need to alter for Containers
             */
            const ElementorSpecialEvent = {
                target: d.querySelector('[data-elementor-id="' + myPopupId + '"] > section')
            };
            elementorProFrontend.modules.popup.closePopup({},ElementorSpecialEvent);
        });
    })
})(window,document)
