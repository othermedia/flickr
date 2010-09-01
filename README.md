Flickr
======

A simple wrapper around the [Flickr JSONP API](http://www.flickr.com/services/api/response.json.html).
No scripts from Flickr are required in advance since they provide a raw JSONP
service; it is up to clients how they want to consume it.


Usage
-----

Instantiate a client using your Flickr API key:

    client = new Flickr.Client('63bb4efae64c3c04510c484dcdaef263');

The client provides convenience methods for calling various feeds, for example:

    client.getGroupPhotos('52240328087@N01', function(feed) {
        for (var i = 0, n = feed.length; i < n; i++)
            alert(feed[i].getTitle());
    });

See the `Flickr.Client` and `Flickr.Photo` classes for more information.
