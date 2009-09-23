/**
 * Flickr.JSONP
 * 
 * Provides a simple API for making JSONP requests. Contains some
 * Flickr-specific code so clients can avoid entering required
 * fields with every request.
 * 
 * JSONP works by generating a global function to receive data from
 * the third party server, then injecting a `script` element into
 * the DOM to make the request. The service will call the generated
 * handler, which itself calls the user's callback function and removes
 * itself from the global namespace.
 **/
Flickr.JSONP = {
  _counter:       0,
  CALLBACK_BASE:  '__jsonpcb__',
  
  /**
   * Flickr.JSONP.getCallbackName() -> String
   * Returns a unique generated name to use for a callback function.
   **/
  getCallbackName: function() {
    return this.CALLBACK_BASE + (this._counter++);
  },
  
  /**
   * Flickr.JSONP.encode(string) -> String
   * - string (String)
   * 
   * Returns a URL-encoded copy of `string`.
   **/
  encode: function(string) {
    return encodeURIComponent(decodeURIComponent(string));
  },
  
  /**
   * Flickr.JSONP.buildURL(path, params) -> String
   * - path (String)
   * - params (Object)
   * 
   * Constructs a URL using the given `path` and set of `params`, which
   * are serialized as a query string.
   **/
  buildURL: function(path, params) {
    if (params === undefined) return path;
    for (var key in params) {
      if (!params.hasOwnProperty(key)) continue;
      path += /\?/.test(path) ? '&' : '?';
      path += this.encode(key) + '=' + this.encode(params[key]);
    }
    return path;
  },
  
  /**
   * Flickr.JSONP.request(path, params, callback, scope) -> undefined
   * - path (String)
   * - params (Object)
   * - callback (Function)
   * - scope (Object)
   * 
   * Makes a request to a JSONP service with the given `path` and `params`,
   * and calls `callback` in the given `scope` with the return value from
   * the JSONP service.
   **/
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

