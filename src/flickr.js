Flickr = {
  Client: new JS.Class({
    initialize: function(key) {
      this._key = key || Flickr.API_KEY;
    },
    
    call: function(method, params, callback, scope) {
      method = /^flickr\./.test(method) ? method : 'flickr.' + method;
      params = JS.extend({
        method:   method,
        api_key:  this._key
      }, params || {});
      Flickr.JSONP.request(Flickr.REST_ENDPOINT, params, callback, scope);
    },
    
    feed: function(path, params, callback, scope) {
      path = /\.gne$/.test(path) ? path : path + '.gne';
      Flickr.JSONP.request(Flickr.FEED_ENDPOINT + path, params, callback, scope);
    },
    
    groupBrowse: function(id, callback, scope) {
      this.call('groups.browse', {cat_id: id}, callback, scope);
    },
    
    groupInfo: function(id, callback, scope) {
      this.call('groups.getInfo', {group_id: id}, callback, scope);
    },
    
    groupDiscuss: function(id, callback, scope) {
      this.feed('groups_discuss', {id: id}, callback, scope);
    },
    
    groupPool: function(id, callback, scope) {
      this.feed('groups_pool', {id: id}, callback, scope);
    },
    
    photoFavourites: function(id, callback, scope) {
      this.feed('photos_faves', {id: id}, callback, scope);
    },
    
    getGroupPhotos: function(id, callback, scope) {
      var wrap = this._wrapPhotos;
      this.groupPool(id, function(data) {
        callback.call(scope, wrap(data));
      });
    },
    
    getFavourites: function(id, callback, scope) {
      var wrap = this._wrapPhotos;
      this.photoFavourites(id, function(data) {
        callback.call(scope, wrap(data));
      });
    },
    
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

