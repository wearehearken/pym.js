var dummyWrapper = document.createElement('div');
document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyWrapper);

describe('pymAutoinit', function() {
    var elements = [];

    beforeEach(function() {
        document.body.style.height = "200px";
        document.body.innerHTML = '<div id="auto-init-test" data-pym-src="child.html"></div>';
        elements = pym.autoInit();
    });

    it('should find one autoinit element', function() {
        expect(elements.length).toBe(1);
    });

    it('the auto init element should have id "auto-init-test"', function() {
        expect(elements[0].id).toBe('auto-init-test');
    });
});

describe('pymParent', function() {
    pymParent = new pym.Parent('example', 'child.html', {});

    it('should have an element', function() {
        expect(pymParent.el).toBeDefined();
    });
});

describe('pymChild', function() {
    pymChild = new pym.Child();

    it('sendHeight should return 200', function() {
        expect(pymChild.sendHeight()).toBe('200');
    });
});
