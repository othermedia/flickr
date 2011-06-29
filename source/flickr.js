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
     * Flickr.Client#search(text, callback, scope) -> undefined
     * - text (String)
     * - params (Object)
     * - callback (Function)
     * - scope (Object)
     *
     * Searches Flickr for photos matching the given string. The search can be
     * customised by passing in additional parameters via the `params` object;
     * for documentation of allowed parameters please refer to the Flickr API:
     * http://www.flickr.com/services/api/flickr.photos.search.html
     **/
    search: function(text, params, callback, scope) {
      params = params || {};
      params.text = text;
      this.call('photos.search', params, callback, scope);
    },
    
    /**
     * Flickr.Client#getSearch(text, callback, scope) -> undefined
     * - text (String)
     * - callback (Function)
     * - scope (Object)
     *
     * Searches Flickr for photos matching the given string. Result items are
     * wrapped as `Flickr.Photo` objects.
     **/
    getSearch: function(text, callback, scope) {
      var wrap = this._wrapPhotos;
      this.search(text, {}, function(data) {
        callback.call(scope, wrap(data.photos, 'photo'));
      });
    },
    
    /**
     * Flickr.Client#findByUsername(username, callback, scope) -> undefined
     * - username (String)
     * - callback (Function)
     * - scope (Object)
     **/
    findByUsername: function(username, callback, scope) {
      this.call('people.findByUsername', {username: username}, callback, scope);
    },
    
    /**
     * Flickr.Client#getUserId(username, callback, scope) -> undefined
     * - username (String)
     * - callback (Function)
     * - scope (Object)
     **/
    getUserId: function(username, callback, scope) {
      this.findByUsername(username, function(data) {
        callback.call(scope, data.user.id);
      });
    },
    
    /**
     * Flickr.Client#publicPhotos(id, callback, scope) -> undefined
     * - id (String)
     * - callback (Function)
     * - scope (Object)
     **/
    publicPhotos: function(id, callback, scope) {
      var extras = ['media', 'description', 'o_url'].join(',');
      this.call('people.getPublicPhotos', {user_id: id, extras: extras}, callback, scope);
    },
    
    /**
     * Flickr.Client#getPublicPhotos(id, callback, scope) -> undefined
     * - id (String)
     * - callback (Function)
     * - scope (Object)
     *
     * Feed items are wrapped as `Flickr.Photo` objects.
     **/
    getPublicPhotos: function(id, callback, scope) {
      var wrap = this._wrapPhotos;
      this.publicPhotos(id, function(data) {
        callback.call(scope, wrap(data.photos, 'photo'));
      });
    },
    
    /**
     * Flickr.Client#photosOf(id, callback, scope) -> undefined
     * - id (String)
     * - callback (Function)
     * - scope (Object)
     **/
    photosOf: function(id, callback, scope) {
      this.call('people.getPhotosOf', {user_id: id}, callback, scope);
    },
    
    /**
     * Flickr.Client#photosOf(id, callback, scope) -> undefined
     * - id (String)
     * - callback (Function)
     * - scope (Object)
     *
     * Feed items are wrapped as `Flickr.Photo` objects.
     **/
    getPhotosOf: function(id, callback, scope) {
      var wrap = this._wrapPhotos;
      this.photosOf(id, function(data) {
        callback.call(scope, wrap(data.photos, 'photo'));
      });
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
    _wrapPhotos: function(data, name) {
      name = name || 'items';
      var photos = [];
      for (var i = 0, n = data[name].length; i < n; i++)
        photos.push(new Flickr.Photo(data[name][i]));
      return photos;
    }
  }),
  
  API_KEY:        null,
  REST_ENDPOINT:  'http://api.flickr.com/services/rest/',
  FEED_ENDPOINT:  'http://api.flickr.com/services/feeds/'
};
