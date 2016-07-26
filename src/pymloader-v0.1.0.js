(function() {
    // TODO: retrieve version and url from parameters
    var version = '1.0.0';
    var base_domain = 'apps.npr.org';
    var minified = false;
    var pympath = '//' + base_domain + '/pym/pym-v' + version;
    if (minified) {
        pympath += '.min';
    }

    /*
     * Callback for handling document load events
     * in some cases due to the presence of pjax loading
     * we want to force pym autoinit to run to ensure that
     * every pym data attribute element has been considered
     */
    var pageLoaded = function(e) {
        // Cleanup fallbacks
        document.removeEventListener( "DOMContentLoaded", pageLoaded );
        window.removeEventListener( "load", pageLoaded );
        // Force autoInit to handle edge cases
        if (window.pym) {
            window.pym.autoInit();
        }
    };

    /*
     * Load pym with requirejs if it is available on the page
     * found in some CorePublisher CMS member sites
     */
    var rqload = function() {
        if (typeof requirejs !== 'undefined') {
            // Requirejs detected, create a local require.js namespace
            var require_pym = requirejs.config({
                context: 'require_pym'+version,
                paths: {
                    'pym': pympath,
                 },
                shim: {
                    'pym': { exports: 'pym' }
                }
            });

            // Load pym into locale namespace
            require_pym(['require', 'pym'], function (require, Pym) {
                // Force autoInit call
                Pym.autoInit();
            });
            return true;
        }
        return false;
    }

    /*
     * Load pym through jQuery async getScript module
     * since this loader can be embedded multiple times in the same post
     * the function manages a global flag called pymloading to avoid
     * possible race conditions
     */
    var jqload = function() {
        if (typeof jQuery !== 'undefined' && typeof jQuery.getScript === 'function') {
            // Another instance of jquery is loading pym asynchronously
            if (window.pymloading) {return;}
            // Flag to avoid race conditions when multiple scripts are loading
            window.pymloading = true;
            // Load pym script
            jQuery.getScript(pympath+'.js').done(function () {
                var pyminstances = window.pym.autoInit();
                delete window.pymloading;
            }).fail(function() {
                delete window.pymloading;
            });
            return true;
        }
        return false;
    }


    /*
     * As a fallback if we can not use require.js nor jquery
     * try to document.write the script tag
     * the function manages a global flag called pymloading to avoid
     * possible race conditions
     */
    var appendpym = function() {
        var s=document.createElement('script');
        s.src=pympath+'.js';
        document.body.appendChild(s);
    }

    // If pym is already loaded, don't repeat the process.
    console.log("loader: is pym already on the page?");
    if (window.pym) {window.pym.autoInit(); return;}

    // Try to load in priority order
    // 1. RequireJS if available
    console.log("loader: try loading via AMD");
    if (rqload()) { return; }
    console.log("loader: try loading via jQuery");
    // 2. jQuery if available
    if(jqload()) { return;}
    console.log("loader: try loading appending directly to body");
    // 3. Append pym directly to the body
    appendpym();

    // Listen to page load events to account for pjax load and sync issues
    window.document.addEventListener("DOMContentLoaded", pageLoaded);
    // Fallback for wider browser support
    window.addEventListener("load", pageLoaded);
})();
