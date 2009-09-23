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
    return this._data.media.m;
  },
  
  /**
   * Flickr.Photo#getAuthor() -> String
   **/
  
  /**
   * Flickr.Photo#getAuthorId() -> String
   **/
  
  /**
   * Flickr.Photo#getDateTaken() -> String
   **/
  
  /**
   * Flickr.Photo#getDescription() -> String
   **/
  
  /**
   * Flickr.Photo#getLink() -> String
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
  // Generate accessor methods for fields in Flickr API objects
  var map = Flickr.Photo.METHOD_MAPPINGS;
  for (var key in map) (function(method, property) {
    Flickr.Photo.define('get' + method, function() {
      return this._data[property];
    });
  })(key, map[key]);
})();

