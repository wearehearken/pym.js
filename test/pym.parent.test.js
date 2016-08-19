describe('pymParent', function() {

    describe('config', function() {
        var pymParent;
        var url = 'http://localhost:9876/base/test/html/child.html';

        beforeEach(function() {
            document.body.innerHTML = '<div id="example"><p id="placeholder"></p></div>';
        });

        afterEach(function() {
            document.body.innerHTML = '';
            // Clean pymParent
            pymParent.remove();
            pymParent = null;
        });

        it('should have replace the contents of the container', function() {
            pymParent = new pym.Parent('example', url, {});
            expect(document.getElementById('placeholder')).toBeNull();
        });

        it('should have an element once initialized', function() {
            pymParent = new pym.Parent('example', url, {});
            expect(pymParent.el).toBeDefined();
        });

        it('should have an iframe once initialized', function() {
            pymParent = new pym.Parent('example', url, {});
            expect(pymParent.iframe).toBeDefined();
        });

        it('should have an url defined once initialized', function() {
            pymParent = new pym.Parent('example', url, {});
            expect(pymParent.url).toEqual(url+'?');
        });

        it('should be able to overwrite the xdomain property through config', function() {
            var xdomain = '\\*\.npr\.org'
            pymParent = new pym.Parent('example', url, {xdomain: xdomain});
            expect(pymParent.settings.xdomain).toEqual(xdomain);
        });

        it('should be able to add allowfullscreen attribute to iframe', function() {
            var allowfullscreen = true;
            pymParent = new pym.Parent('example', url, {allowfullscreen: allowfullscreen});
            var iframe = pymParent.iframe;
            expect(pymParent.settings.allowfullscreen).toEqual(allowfullscreen);
            expect(iframe.getAttribute('allowfullscreen')).toEqual('');
        });

        it('should ignore allowfullscreen attribute if set to false to iframe', function() {
            var allowfullscreen = false;
            pymParent = new pym.Parent('example', url, {allowfullscreen: allowfullscreen});
            var iframe = pymParent.iframe;
            expect(pymParent.settings.allowfullscreen).toEqual(allowfullscreen);
            expect(iframe.getAttribute('allowfullscreen')).toBeNull();
        });

        it('should be able to add id attribute to iframe', function() {
            var id = 'test';
            pymParent = new pym.Parent('example', url, {id: id});
            var iframe = pymParent.iframe;
            expect(pymParent.settings.id).toEqual(id);
            expect(iframe.getAttribute('id')).toEqual(id);
        });

        it('should be able to add name attribute to iframe', function() {
            var name = 'test';
            pymParent = new pym.Parent('example', url, {name: name});
            var iframe = pymParent.iframe;
            expect(pymParent.settings.name).toEqual(name);
            expect(iframe.getAttribute('name')).toEqual(name);
        });

        it('should be able to add sandbox attribute to iframe', function() {
            pymParent = new pym.Parent('example', url, {sandbox: 'allow-scripts'});
            var iframe = pymParent.iframe;
            expect(iframe.getAttribute('sandbox')).toEqual('allow-scripts');
        });

        it('should not be able to add sandbox attribute if not a string to iframe', function() {
            pymParent = new pym.Parent('example', url, {sandbox: 0});
            var iframe = pymParent.iframe;
            expect(iframe.getAttribute('sandbox')).toBeNull();
        });
    });

    describe('remove method', function() {
        var pymParent;
        var url = 'http://localhost:9876/base/test/html/child.html';

        beforeEach(function() {
            document.body.innerHTML = '<div id="example"><p id="placeholder"></p></div>';
        });

        afterEach(function() {
            document.body.innerHTML = '';
            // Clean pymParent
            pymParent = null;
        });

        it('should have not listen to resize events once removed', function() {
            pymParent = new pym.Parent('example', url, {});
            spyOn(pymParent, 'sendWidth').and.callThrough();
            pymParent.remove();
            window.dispatchEvent(new Event('resize'));
            expect(pymParent.sendWidth).not.toHaveBeenCalled();
        });

        it('should have not listen to message events once removed', function(done) {
            function handler(e) {
                window.removeEventListener('message',handler);
                expect(pymParent.iframe.getAttribute('height')).toEqual("1px");
                done();
            };
            pymParent = new pym.Parent('example', url, {});
            var iframe = pymParent.iframe;
            var old_height = iframe.setAttribute('height', '1px');
            pymParent.remove();
            window.addEventListener('message',handler,false);
            window.postMessage('pymxPYMxexamplexPYMxheightxPYMx100', '*');
        });

        it('should have no content on the container once remove has been called', function() {
            pymParent = new pym.Parent('example', url, {});
            spyOn(pymParent, 'sendWidth').and.callThrough();
            pymParent.remove();
            expect(pymParent.el.childElementCount).toEqual(0);
        });

    });

    describe('contructIframe method', function() {
        var pymParent;
        var url = 'http://localhost:9876/base/test/html/child.html';

        beforeEach(function() {
            document.body.innerHTML = '<div id="example"><p id="placeholder"></p></div>';
        });

        afterEach(function() {
            document.body.innerHTML = '';
            // Clean pymParent
            pymParent.remove();
            pymParent = null;
        });

        it('should include hash in iframe.src if given in the original url', function() {
            var hash = '#param1=5&param2=test'
            url = 'http://localhost:9876/base/test/html/child.html'+hash;
            pymParent = new pym.Parent('example', url, {});
            var iframe = pymParent.iframe;
            expect(pymParent.iframe.getAttribute('src')).toContain(hash);
        });

        it('should respect query parameters given in the original url', function() {
            var query = '?param1=5&param2=test'
            url = 'http://localhost:9876/base/test/html/child.html'+query;
            pymParent = new pym.Parent('example', url, {});
            var iframe = pymParent.iframe;
            expect(pymParent.iframe.getAttribute('src')).toContain(query);
        });

        it('should respect query parameters given in the original url', function() {
            var query = '?initialWidth=5&param2=test'
            url = 'http://localhost:9876/base/test/html/child.html'+query;
            pymParent = new pym.Parent('example', url, {});
            var iframe = pymParent.iframe;
            expect(pymParent.iframe.getAttribute('src')).toContain(query);
        });
    });
});
