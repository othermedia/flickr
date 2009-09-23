/**
 * == flickr ==
 **/

/** section: flickr
 * Flickr
 **/
Flickr = {
  /**
   * class Flickr.Client
   * Provides a JavaScript API to methods in the Flickr web service API.
   **/
  Client: new JS.Class({
    /**
     * new Flickr.Client(key)
     * - key (String): Your site's Flickr API key
     * Clients are instantiated using a Flickr API key. If none is provided, the
     * value of `Flickr.API_KEY` is used instead.
     **/
    initialize: function(key) {
      this._key = key || Flickr.API_KEY;
    },
    
    /**
     * Flickr.Client#call(method, params, callback, scope) -> undefined
     * - method (String)
     * - params (Object)
     * - callback (Function)
     * - scope (Object)
     * 
     * Calls the named `method` in the Flickr JSONP API, with the given set
     * of `params`. The `callback` is called in the given `scope` with the
     * response from the JSONP service.
     **/
    call: function(method, params, callback, scope) {
      method = /^flickr\./.test(method) ? method : 'flickr.' + method;
      params = JS.extend({
        method:   method,
        api_key:  this._key
      }, params || {});
      Flickr.JSONP.request(Flickr.REST_ENDPOINT, params, callback, scope);
    },
    
    /**
     * Flickr.Client#feed(path, params, callback, scope) -> undefined
     * - path (String)
     * - params (Object)
     * - callback (Function)
     * - scope (Object)
     * 
     * Fetches the named feed and calls `callback` in the given `scope` with
     * the response from the JSONP feed service.
     **/
    feed: function(path, params, callback, scope) {
      path = /\.gne$/.test(path) ? path : path + '.gne';
      Flickr.JSONP.request(Flickr.FEED_ENDPOINT + path, params, callback, scope);
    },
    
    /**
     * Flickr.Client#groupBrowse(id, callback, scope) -> undefined
     * - id (String)
     * - callback (Function)
     * - scope (Object)
     **/
    groupBrowse: function(id, callback, scope) {
      this.call('groups.browse', {cat_id: id}, callback, scope);
    },
    
    /**
     * Flickr.Client#groupInfo(id, callback, scope) -> undefined
     * - id (String)
     * - callback (Function)
     * - scope (Object)
     **/
    groupInfo: function(id, callback, scope) {
      this.call('groups.getInfo', {group_id: id}, callback, scope);
    },
    
    /**
     * Flickr.Client#groupDiscuss(id, callback, scope) -> undefined
     * - id (String)
     * - callback (Function)
     * - scope (Object)
     **/
    groupDiscuss: function(id, callback, scope) {
      this.feed('groups_discuss', {id: id}, callback, scope);
    },
    
    /**
     * Flickr.Client#groupPool(id, callback, scope) -> undefined
     * - id (String)
     * - callback (Function)
     * - scope (Object)
     **/
    groupPool: function(id, callback, scope) {
      this.feed('groups_pool', {id: id}, callback, scope);
    },
    
    /**
     * Flickr.Client#photoFavourites(id, callback, scope) -> undefined
     * - id (String)
     * - callback (Function)
     * - scope (Object)
     **/
    photoFavourites: function(id, callback, scope) {
      this.feed('photos_faves', {id: id}, callback, scope);
    },
    
    /**
     * Flickr.Client#getGroupPhotos(id, callback, scope) -> undefined
     * - id (String)
     * - callback (Function)
     * - scope (Object)
     * 
     * Feed items are wrapped as `Flickr.Photo` objects.
     **/
    getGroupPhotos: function(id, callback, scope) {
      var wrap = this._wrapPhotos;
      this.groupPool(id, function(data) {
        callback.call(scope, wrap(data));
      });
    },
    
    /**
     * Flickr.Client#getFavourites(id, callback, scope) -> undefined
     * - id (String)
     * - callback (Function)
     * - scope (Object)
     * 
     * Feed items are wrapped as `Flickr.Photo` objects.
     **/
    getFavourites: function(id, callback, scope) {
      var wrap = this._wrapPhotos;
      this.photoFavourites(id, function(data) {
        callback.call(scope, wrap(data));
      });
    },
    
    /**
     * Flickr.Client#_wrapPhotos(data) -> Array
     * - data (Array)
     * 
     * Takes a list of feed items from the Flickr API and wraps them up as
     * instances of `Flickr.Photo`.
     **/
    _wrapPhotos: function(data) {
      var photos = [];
      for (var i = 0, n = data.items.length; i < n; i++)
        photos.push(new Flickr.Photo(data.items[i]));
      return photos;
    }
  }),
  
  API_KEY:        null,
  REST_ENDPOINT:  'http://api.flickr.com/services/rest/',
  FEED_ENDPOINT:  'http://api.flickr.com/services/feeds/'
};

