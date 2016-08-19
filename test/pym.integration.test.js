describe('pymIntegration', function() {
    var pymParent;
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

    beforeEach(function(done) {

        function onStartMessage(msg) {
            done();
        }
        document.body.innerHTML = '<div id="example"></div><div id="scroll"></div>';
        pymParent = new pym.Parent('example', 'http://localhost:9876/base/test/html/child_comm_test.html', {});
        pymParent.onMessage('start', onStartMessage);
        spyOn(stub, 'handler').and.callThrough();
        spyOn(stub, 'xdomain_handler').and.callThrough();

    });

    afterEach(function() {
        document.body.innerHTML = '';
        stub.handler.calls.reset();
        stub.xdomain_handler.calls.reset();
        // Stop listeners
        removeManualMessageListeners();
        pymParent.remove();
        pymParent = null;
    });

    describe("parent outgoing messages", function() {

        it("should send a width message to child on a resize", function(done) {
            function handler(msg) {
                stub.handler(msg);
                expect(stub.handler).toHaveBeenCalledTimes(1);
                done();
            };
            pymParent.onMessage('mirror', handler);
            window.dispatchEvent(new Event('resize'));

        });

        it("should send a predictable width to child on a resize", function(done) {
            var predictedWidth = pymParent.el.offsetWidth.toString();
            function handler(msg) {
                stub.handler(msg);
                expect(predictedWidth).toEqual(msg);
                done();
            };
            pymParent.onMessage('mirror', handler);
            window.dispatchEvent(new Event('resize'));

        });

        it("should be able to directly send width event to child", function(done) {
            function handler(msg) {
                stub.handler(msg);
                expect(stub.handler).toHaveBeenCalledTimes(1);
                done();
            };
            pymParent.onMessage('mirror', handler);
            pymParent.sendWidth();
        });
    });

    describe("parent incoming messages", function() {

        it("should be able to receive height events from child", function(done) {
            function handler(msg) {
                stub.handler(msg);
                expect(stub.handler).toHaveBeenCalledTimes(1);
                done();
            }
            pymParent.onMessage('height', handler);
            pymParent.sendMessage('forceHeight', '900');
        });

        it("should receive a predictable height based on the ContentDocument from child", function(done) {
            var predictedHeight = pymParent.iframe.contentDocument.getElementsByTagName('body')[0].offsetHeight.toString();
            function handler(msg) {
                stub.handler(msg);
                expect(predictedHeight).toEqual(msg);
                done();
            }
            pymParent.onMessage('height', handler);
            pymParent.sendMessage('forceHeight', '900');
        });

        it("should be able to receive navigateTo events from child", function(done) {
            function handler(msg) {
                stub.handler(msg);
                expect(stub.handler).toHaveBeenCalledTimes(1);
                done();
            }

            // Remove navigateTo listener not to incur on page reload issues
            // https://github.com/karma-runner/karma/issues/1101
            delete pymParent.messageHandlers.navigateTo;
            pymParent.onMessage('navigateTo', handler);
            pymParent.sendMessage('forceNavigateTo', 'http://example.com');
        });

        it("should be able to receive expected navigateTo url from child", function(done) {
            var url = 'http://example.com';
            function handler(msg) {
                stub.handler(msg);
                expect(url).toEqual(msg);
                done();
            };
            // Remove navigateTo listener not to incur on page reload issues
            // https://github.com/karma-runner/karma/issues/1101
            delete pymParent.messageHandlers.navigateTo;
            pymParent.onMessage('navigateTo', handler);
            pymParent.sendMessage('forceNavigateTo', url);
        });

        it("should be able to receive scrollTo events from child", function(done) {
            function handler(msg) {
                stub.handler(msg);
                expect(stub.handler).toHaveBeenCalledTimes(1);
                done();
            }
            // Remove navigateTo listener not to incur on page reload issues
            // https://github.com/karma-runner/karma/issues/1101
            delete pymParent.messageHandlers.navigateTo;
            pymParent.onMessage('navigateTo', handler);
            pymParent.sendMessage('forceScrollTo', 'scroll');
        });

        it("should be able to receive predictable scrollTo hashes from child", function(done) {
            var hash = "scroll";
            function handler(msg) {
                stub.handler(msg);
                expect(msg).toEqual("#"+hash);
                done();
            };
            // Remove navigateTo listener not to incur on page reload issues
            // https://github.com/karma-runner/karma/issues/1101
            delete pymParent.messageHandlers.navigateTo;
            pymParent.onMessage('navigateTo', handler);
            pymParent.sendMessage('forceScrollTo', hash);
        });

        it("should be able to send and receive custom events to child", function(done) {
            var data = "example";
            function handler(msg) {
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
            var data = "example";
            function handler(msg) {
                stub.handler(msg);
            };
            var xdomain_handler = function(e) {
                stub.xdomain_handler(e);
                expect(stub.handler).not.toHaveBeenCalled();
                expect(stub.xdomain_handler).toHaveBeenCalledTimes(1);
                done();
            };

            pymParent.settings.xdomain = '\\*\.npr\.org'
            pymParent.onMessage('custom', handler);
            registerAndAddMessageListener(xdomain_handler);
            //pymParent.sendMessage('custom', 'example');
            window.postMessage('pymxPYMxexamplexPYMxcustomxPYMxexample', '*');
        });

        it("should ignore messages with no string data", function(done) {
            var data = "example";
            function handler(msg) {
                stub.handler(msg);
            };
            var xdomain_handler = function(e) {
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
    });
});
