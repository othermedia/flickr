Flickr.Photo = new JS.Class({
  initialize: function(feedData) {
    this._data = feedData;
  },
  
  getTags: function() {
    var tags = this._data.tags;
    return (tags === '') ? [] : tags.split(/\s+/);
  },
  
  getThumbnail: function() {
    return this._data.media.m;
  },
  
  extend: {
    METHOD_MAPPINGS: {
      Author:       'author',
      AuthorId:     'author_id',
      DateTaken:    'date_taken',
      Description:  'description',
      Link:         'link',
      Published:    'published',
      Title:        'title'
    }
  }
});

(function() {
  var map = Flickr.Photo.METHOD_MAPPINGS;
  for (var key in map) (function(method, property) {
    Flickr.Photo.define('get' + method, function() {
      return this._data[property];
    });
  })(key, map[key]);
})();

