describe('pymIntegration', function() {
    var pymParent;
    var originalTimeout;

    var stub = {
        log: function(e) {
            console.log(e.origin);
        },
        handler: function(msg) {
            //console.log("handler: msg: " + msg);
        },
        xdomain_handler: function(msg) {
            //console.log("handler: msg: " + msg);
        }
    }
    var manualMessagelisteners = [];

    function registerAndAddMessageListener(f) {
        window.addEventListener('message',f,false);
        manualMessagelisteners.push(f);
    };

    function removeManualMessageListeners() {
        for (var i=0; i < manualMessagelisteners.length; i++){
            window.removeEventListener("message", manualMessagelisteners[i]);
        }
        manualMessagelisteners = [];
    };

    beforeAll(function(){
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    });

    afterAll(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    beforeEach(function(done) {
        // console.log("beforeEach: start", new Date().toLocaleTimeString());
        function onStartMessage(msg) {
            // console.log("beforeEach: height msg received", new Date().toLocaleTimeString());
            done();
        }
        document.body.innerHTML = '<div id="integration"></div><div id="scroll"></div>';
        pymParent = new pym.Parent('integration', 'http://localhost:9876/base/test/html/child_comm_test.html', {});
        pymParent.onMessage('height', onStartMessage);
        spyOn(stub, 'handler').and.callThrough();
        spyOn(stub, 'xdomain_handler').and.callThrough();
    });

    afterEach(function() {
        //jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        stub.handler.calls.reset();
        stub.xdomain_handler.calls.reset();
        // Stop listeners
        removeManualMessageListeners();
        pymParent.remove();
        pymParent = null;
        document.body.innerHTML = '';
    });

    describe("parent outgoing messages", function() {
        it("should send a width message to child on a resize", function(done) {
            // console.log("Spec: start", new Date().toLocaleTimeString());
            function handler(msg) {
                // console.log("Spec: received width_mirror msg", new Date().toLocaleTimeString());
                stub.handler(msg);
                expect(stub.handler).toHaveBeenCalledTimes(1);
                done();
            };
            pymParent.onMessage('width_mirror', handler);
            // IE9 does not support Event constructor
            // via: http://stackoverflow.com/questions/1818474/how-to-trigger-the-window-resize-event-in-javascript/18693617#18693617
            var evt = window.document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);

        });

        it("should send a predictable width to child on a resize", function(done) {
            // console.log("Spec: start", new Date().toLocaleTimeString());
            var predictedWidth = pymParent.el.offsetWidth.toString();
            function handler(msg) {
                // console.log("Spec: received width_mirror msg", new Date().toLocaleTimeString());
                stub.handler(msg);
                expect(predictedWidth).toEqual(msg);
                done();
            };
            pymParent.onMessage('width_mirror', handler);
            var evt = window.document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);

        });

        it("should be able to directly send width event to child", function(done) {
            // console.log("Spec: start", new Date().toLocaleTimeString());
            function handler(msg) {
                // console.log("Spec: received width_mirror msg", new Date().toLocaleTimeString());
                stub.handler(msg);
                expect(stub.handler).toHaveBeenCalledTimes(1);
                done();
            };
            pymParent.onMessage('width_mirror', handler);
            pymParent.sendWidth();
        });
    });

    describe("parent incoming messages", function() {
        it("should be able to receive height events from child", function(done) {
            // console.log("Spec: start", new Date().toLocaleTimeString());
            function handler(msg) {
                // console.log("Spec: received height msg", new Date().toLocaleTimeString());
                stub.handler(msg);
                expect(stub.handler).toHaveBeenCalledTimes(1);
                //var predictedHeight = pymParent.iframe.contentDocument.getElementsByTagName('body')[0].offsetHeight.toString();
                // expect(predictedHeight).toEqual(msg);
                done();
            }
            pymParent.onMessage('height', handler);
            pymParent.sendMessage('forceHeight', '900');
        });

        it("should be able to receive navigateTo events from child", function(done) {
            // console.log("Spec: start", new Date().toLocaleTimeString());
            var url = 'http://example.com';
            function handler(msg) {
                // console.log("Spec: received navigateTo msg", new Date().toLocaleTimeString());
                stub.handler(msg);
                expect(stub.handler).toHaveBeenCalledTimes(1);
                expect(url).toEqual(msg);
                done();
            }

            // Remove navigateTo listener not to incur on page reload issues
            // https://github.com/karma-runner/karma/issues/1101
            delete pymParent.messageHandlers.navigateTo;
            pymParent.onMessage('navigateTo', handler);
            pymParent.sendMessage('forceNavigateTo', 'http://example.com');
        });

        it("should be able to receive scrollTo events from child", function(done) {
            // console.log("Spec: start", new Date().toLocaleTimeString());
            var hash = "scroll";
            function handler(msg) {
                // console.log("Spec: received navigateTo msg", new Date().toLocaleTimeString());
                stub.handler(msg);
                expect(stub.handler).toHaveBeenCalledTimes(1);
                expect(msg).toEqual("#"+hash);
                done();
            }
            // Remove navigateTo listener not to incur on page reload issues
            // https://github.com/karma-runner/karma/issues/1101
            delete pymParent.messageHandlers.navigateTo;
            pymParent.onMessage('navigateTo', handler);
            pymParent.sendMessage('forceScrollTo', 'scroll');
        });

        it("should be able to send and receive custom events to child", function(done) {
            // console.log("Spec: start", new Date().toLocaleTimeString());
            var data = "example";
            function handler(msg) {
                // console.log("Spec: received custom msg", new Date().toLocaleTimeString());
                stub.handler(msg);
                expect(stub.handler).toHaveBeenCalledTimes(1);
                done();
            }
            // Remove navigateTo listener not to incur on page reload issues
            // https://github.com/karma-runner/karma/issues/1101
            delete pymParent.messageHandlers.navigateTo;
            pymParent.onMessage('custom', handler);
            pymParent.sendMessage('custom', 'example');
        });

        it("should ignore messages from other domains sent from the child", function(done) {
            // console.log("Spec: start", new Date().toLocaleTimeString());
            var data = "example";
            function handler(msg) {
                // console.log("Spec: received invalid custom msg", new Date().toLocaleTimeString());
                stub.handler(msg);
                expect(true).toBe(false);
            };
            var xdomain_handler = function(e) {
                // console.log("Spec: generic listener has received invalid custom msg", new Date().toLocaleTimeString());
                stub.xdomain_handler(e);
                expect(stub.handler).not.toHaveBeenCalled();
                expect(stub.xdomain_handler).toHaveBeenCalledTimes(1);
                done();
            };
            pymParent.settings.xdomain = '\\*\.npr\.org'
            pymParent.onMessage('custom', handler);
            registerAndAddMessageListener(xdomain_handler);
            //pymParent.sendMessage('custom', 'example');
            window.postMessage('pymxPYMxintegrationxPYMxcustomxPYMxexample', '*');
        });

        it("should ignore messages with no string data", function(done) {
            // console.log("Spec: start", new Date().toLocaleTimeString());
            var data = "example";
            function handler(msg) {
                // console.log("Spec: received invalid custom msg", new Date().toLocaleTimeString());
                stub.handler(msg);
            };
            var xdomain_handler = function(e) {
                // console.log("Spec: generic listener has received invalid custom msg", new Date().toLocaleTimeString());
                stub.xdomain_handler(e);
                expect(stub.handler).not.toHaveBeenCalled();
                expect(stub.xdomain_handler).toHaveBeenCalledTimes(1);
                done();
            };

            pymParent.settings.xdomain = '\\*\.npr\.org'
            pymParent.onMessage('custom', handler);
            registerAndAddMessageListener(xdomain_handler);
            window.postMessage({'object': 'pepe'}, '*');
        });

        it("should accept empty messages", function(done) {
            // console.log("Spec: start", new Date().toLocaleTimeString());
            var data = "example";
            function handler(msg) {
                // console.log("Spec: received invalid custom msg", new Date().toLocaleTimeString());
                stub.handler(msg);
            };
            var xdomain_handler = function(e) {
                // console.log("Spec: generic listener has received invalid custom msg", new Date().toLocaleTimeString());
                stub.xdomain_handler(e);
                expect(stub.handler).not.toHaveBeenCalledTimes(1);
                expect(stub.xdomain_handler).toHaveBeenCalledTimes(1);
                done();
            };

            pymParent.settings.xdomain = '\\*\.npr\.org'
            pymParent.onMessage('custom', handler);
            registerAndAddMessageListener(xdomain_handler);
            window.postMessage("pymxPYMxintegrationxPYMxcustomxPYMx", '*');
        });
    });
});
