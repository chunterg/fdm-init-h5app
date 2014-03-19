(function() {
  var templatesCacheLoader = '<h1><i class="iconfont">&#xf0020;</i><%=title%></h1><ul><% for (var i = 0; i < list.length; i ++) { %><li>索引<%= i + 1 %>：<%= list[i] %></li><% } %></ul>'
  ;

  // CommonJS module is defined
  if (typeof module !== "undefined" && module.exports) {
      module.exports = templatesCacheLoader;
  }
  /*global ender:false */
  if (typeof ender === 'undefined') {
      this['view/testview'] = templatesCacheLoader;
  }
  /*global define:false */
  if (typeof define === "function" && (define.amd||define.fmd)) {
      define("view/testview", [], function () {
          return templatesCacheLoader;
      });
  }
})();