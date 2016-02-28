var initInView = function() {
	var rules;
	var inView = function(selector) {
		var inViewSelector = selector.match(/(.*):in-view/)[1];
		var el = document.querySelectorAll(inViewSelector);
		return el;
	};

	var getTargets = function(parent, selector) {
		var el;
		if (/:in-view$/g.test(selector)) {
			el = [parent];
		} else {
			selector = selector.replace(/:in-view/, '');
			el = parent.querySelectorAll(selector);
		}
		return el;
	}

	Polyfill({ selectors: [":in-view"] })
		.doMatched( function(ruleDeclarations){
			rules = ruleDeclarations;
			window.addEventListener('scroll', applyRules);
		})
		.undoUnmatched( function(rules){
			window.removeEventListener('scroll', applyRules);
		});

	var onscroll = function(e) {
		rules.each(function(rule) {
			inView(rule.getSelectors());
		});
	}

	var applyRules = function() {
		rules.each(function(rule) {
			var targetSelector = rule.getSelectors();
			var elements = inView(targetSelector);
			var cssDeclarations = rule.getDeclaration();
			for (var x in elements) {
				if (elements.hasOwnProperty(x)) {
					var el = elements[x];
					if (
						el.offsetTop < window.scrollY + window.innerHeight &&
						el.offsetTop + el.offsetHeight > window.scrollY &&
						el.offsetLeft + el.offsetWidth > 0 &&
						el.offsetLeft < window.innerWidth
					) {
						var target = getTargets(el, targetSelector);
						for (var y in target) {
							if (target.hasOwnProperty(y)) {
								for (var i in cssDeclarations) {
									if (cssDeclarations.hasOwnProperty(i)) {
										target[y].style[i] = cssDeclarations[i];
									}
								}
							}
						}
					} else {
						var target = getTargets(el, targetSelector);
						for (var y in target) {
							if (target.hasOwnProperty(y)) {
								for (var i in cssDeclarations) {
									if (cssDeclarations.hasOwnProperty(i)) {
										target[y].style[i] = '';
									}
								}
							}
						}
					}
				}
			}
		});
	}
};

initInView();
