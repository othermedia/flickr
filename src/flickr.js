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
      Flickr.JSONP.request(Flickr.FEED_ENDPOINT + path, params, callback, scope);
    },
    
    groupBrowse: function(id, callback, scope) {
      this.call('groups.browse', {cat_id: id}, callback, scope);
    },
    
    groupInfo: function(id, callback, scope) {
      this.call('groups.getInfo', {group_id: id}, callback, scope);
    },
    
    groupDiscuss: function(id, callback, scope) {
      this.feed('groups_discuss.gne', {id: id}, callback, scope);
    },
    
    groupPool: function(id, callback, scope) {
      this.feed('groups_pool.gne', {id: id}, callback, scope);
    },
    
    getGroupPhotos: function(id, callback, scope) {
      this.groupPool(id, function(data) {
        var photos = [];
        for (var i = 0, n = data.items.length; i < n; i++)
          photos.push(new Flickr.Photo(data.items[i]));
        callback.call(scope, photos);
      });
    }
  }),
  
  API_KEY:        null,
  REST_ENDPOINT:  'http://api.flickr.com/services/rest/',
  FEED_ENDPOINT:  'http://api.flickr.com/services/feeds/'
};

