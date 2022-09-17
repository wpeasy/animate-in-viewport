/*
NOTE: Requires Breakpoint CSS
*/
;(w=>{
    /*
    Gets the breakpoint name set by the CSS "Breakpoint CSS"
    */
    const getBreakpointName = ()=>{
        return window.getComputedStyle(document.body, ':before').content.replace(/\"/g, '')
    }

    if(w._WPG === undefined) {w._WPG = {}}

    w._WPG.breakpoints = {
        getBreakpointName: getBreakpointName
    }
})(window)
