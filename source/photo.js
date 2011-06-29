/**
 * class Flickr.Photo
 * Provides a wrapper object for items from Flickr photo feeds.
 **/
Flickr.Photo = new JS.Class({
  /**
   * new Flickr.Photo(feedData)
   **/
  initialize: function(feedData) {
    this._data = feedData;
  },
  
  /**
   * Flickr.Photo#constructURI(size) -> String
   * - size (String)
   **/
  constructImageURI: function(size) {
    var data = this._data;
    size = size || 't';
    return 'http://farm' + data.farm + '.static.flickr.com/' + data.server +
      '/' + data.id + '_' + data.secret + '_' + size + '.jpg';
  },
  
  /**
   * Flickr.Photo#getId() -> String
   **/
  getId: function() {
    return this._data.id;
  },
  
  /**
   * Flickr.Photo#getTags() -> Array
   **/
  getTags: function() {
    var tags = this._data.tags;
    return (tags === '') ? [] : tags.split(/\s+/);
  },
  
  /**
   * Flickr.Photo#getThumbnail() -> String
   **/
  getThumbnail: function() {
    var media = this._data.media;
    return media && media.m ? media.m : this.constructImageURI('m');
  },
  
  /**
   * Flickr.Photo#getLink() -> String
   **/
  getLink: function() {
    return this._data.link || 'http://www.flickr.com/photos/' +
      this.getAuthorId() + '/' + this.getId();
  },
  
  /**
   * Flickr.Photo#getAuthor() -> String
   **/
  
  /**
   * Flickr.Photo#getAuthorId() -> String
   **/
  getAuthorId: function() {
    return this._data.author_id || this._data.owner;
  },
  
  /**
   * Flickr.Photo#getDateTaken() -> String
   **/
  
  /**
   * Flickr.Photo#getDescription() -> String
   **/
  
  /**
   * Flickr.Photo#getPublished() -> String
   **/
  
  /**
   * Flickr.Photo#getTitle() -> String
   **/
  
  extend: {
    METHOD_MAPPINGS: {
      Author:       'author',
      DateTaken:    'date_taken',
      Description:  'description',
      Published:    'published',
      Title:        'title'
    }
  }
});

(function() {
  // Generate accessor methods for fields in Flickr API objects
  var map = Flickr.Photo.METHOD_MAPPINGS;
  for (var key in map) (function(method, property) {
    Flickr.Photo.define('get' + method, function() {
      return this._data[property];
    });
  })(key, map[key]);
})();
