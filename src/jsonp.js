Flickr.JSONP = {
  _counter:       0,
  CALLBACK_BASE:  '__jsonpcb__',
  
  getCallbackName: function() {
    return this.CALLBACK_BASE + (this._counter++);
  },
  
  encode: function(string) {
    return encodeURIComponent(decodeURIComponent(string));
  },
  
  buildURL: function(path, params) {
    if (params === undefined) return path;
    for (var key in params) {
      if (!params.hasOwnProperty(key)) continue;
      path += /\?/.test(path) ? '&' : '?';
      path += this.encode(key) + '=' + this.encode(params[key]);
    }
    return path;
  },
  
  request: function(path, params, callback, scope) {
    var callbackName = this.getCallbackName();
    
    // Not generic, custom fields for Flickr API
    params = JS.extend({
      format:       'json',
      jsoncallback: callbackName
    }, params || {});
    
    var head         = document.getElementsByTagName('head')[0],
        script       = document.createElement('script'),
        location     = this.buildURL(path, params);
    
    window[callbackName] = function(data) {
      window[callbackName] = undefined;
      try { delete window[callbackName] } catch (e) {}
      head.removeChild(script);
      if (callback) callback.call(scope, data);
    };
    
    script.type = 'text/javascript';
    script.src  = location;
    head.appendChild(script);
  }
};

