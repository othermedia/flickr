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
      Flickr.JSONP.request(Flickr.ENDPOINT, params, callback, scope);
    },
    
    browseGroup: function(id, callback, scope) {
      this.call('groups.browse', {cat_id: id}, callback, scope);
    }
  }),
  
  API_KEY:  null,
  ENDPOINT: 'http://api.flickr.com/services/rest/'
};

