(function () {
  var callbacks = [];
  document.addEventListener("DOMContentLoaded", function(){
    for (var i = 0; i < callbacks.length; i++) {
      (callbacks[i])();
    }
  })

  var $l = window.$l = function (theArg) {
    var NodeList;
    if (theArg instanceof HTMLElement) {
      NodeList = [HTMLElement];
    } else if (theArg instanceof Function) {
      if (document.readyState === 'complete') {
        (theArg)();
      } else {
        callbacks.push(theArg);
      }
      return;
    } else {
        NodeList = document.querySelectorAll(theArg);
        NodeList = [].slice.call(NodeList);
    }
    return new DOMNodeCollection(NodeList);
  };

  var DOMNodeCollection = function(HTMLElements) {
    this.HTMLElements = HTMLElements;
  };

  DOMNodeCollection.prototype.html = function (string) {
    if (string === undefined) {
      return this.HTMLElements[0].innerHTML;
    } else {
      for (var i = 0; i < this.HTMLElements.length; i++) {
        this.HTMLElements[i].innerHTML = string;
      }
    }
  };

  DOMNodeCollection.prototype.empty = function () {
    this.html('');
  };

  DOMNodeCollection.prototype.append = function (thing) {
    if (thing instanceof DOMNodeCollection) {
      thing = thing.join("\n");
    }
    var inner;
    for (var i = 0; i < this.HTMLElements.length; i++) {
      inner = this.HTMLElements[i].innerHTML;
      inner = inner.concat(thing);
    }
  };

  DOMNodeCollection.prototype.attr = function (attribute, value) {
    for (var i = 0; i < this.HTMLElements.length; i++) {
      this.HTMLElements[i].setAttribute(attribute, value);
    }
  };

  DOMNodeCollection.prototype.addClass = function (value) {
    this.attr("class", value);
  };

  DOMNodeCollection.prototype.removeClass = function () {
    for (var i = 0; i < this.HTMLElements.length; i++) {
      this.HTMLElements[i].removeAttribute("class");
    }
  };

  DOMNodeCollection.prototype.children = function () {
    var kids = [];
    for (var i = 0; i < this.HTMLElements.length; i++) {
      kids = kids.concat(this.HTMLElements[i].children);
    }
    return kids;
  };

  DOMNodeCollection.prototype.parent = function () {
    var parents = [];
    for (var i = 0; i < this.HTMLElements.length; i++) {
      parents = parents.concat(this.HTMLElements[i].parentNode);
    }
    return parents.uniq();
  };

  Array.prototype.uniq = function () {
    var result = [];
    for (var i = 0; i < this.length; i++) {
      var repeat = false;
      for (var j = 0; j < result.length; j++) {
        if (result[j] === this[i]) {
          repeat = true;
        }
      }
      if (!repeat) {
        result.push(this[i]);
      }
    }
    return result;
  };

  DOMNodeCollection.prototype.find = function (selector) {
    var result = [];
    for (var i = 0; i < this.HTMLElements.length; i++) {
      result = result.concat(this.HTMLElements[i].querySelectorAll(selector));
    }
    return result;
  };

  DOMNodeCollection.prototype.remove = function () {
    for (var i = 0; i < this.HTMLElements.length; i++) {
      this.HTMLElements[i].parentNode.removeChild(this);
    }
    this.HTMLElements = [];
  };

  DOMNodeCollection.prototype.on = function (action, reaction) {
    this.addEventListener(action, reaction);
  };

  DOMNodeCollection.prototype.on = function (action, reaction) {
    this.removeEventListener(action, reaction);
  };

  $l.prototype.extend = function () {
    var final = arguments[0];
    var args = [].slice.call(arguments).slice(1);
    for (var objInd = 0; objInd < args.length; objInd++) {
      for (var key in args[objInd]) {
        if (args[objInd].hasOwnProperty(key)) {
          final[key] = args[objInd][key];
        }
      }
    }
    return final;
  };

  $l.prototype.ajax = function (opt) {
    var defaults = {
      success: function(dataReturned, textStatus, jqXHR) {},
      error: function(jqXHR, textStatus, errorThrown) {},
      url: "#",
      method: "GET",
      data: "",
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    $l.extend(defaults, opt);
  };
})();
