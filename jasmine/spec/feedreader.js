/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* this test ensures each feed in allFeeds
           has url defined and not empty
         */
        it('have URLs', function () {
          var i,
            feedsLength = allFeeds.length,
            feed;
          
          for (i = 0; i < feedsLength; i += 1) {
            feed = allFeeds[i];
            expect(feed.url).toBeDefined();
            expect(feed.url).toEqual(jasmine.any(String));
            expect(feed.url.length).not.toBe(0);
          }
        });


        /* this test ensures each feed in allFeeds
           has name defined and not empty
         */
        it('have names', function () {
          var i,
            feedsLength = allFeeds.length,
            feed;
          
          for (i = 0; i < feedsLength; i += 1) {
            feed = allFeeds[i];
            expect(feed.name).toBeDefined();
            expect(feed.name).toEqual(jasmine.any(String));
            expect(feed.name.length).not.toBe(0);
          }
        });
    });

    describe('The menu', function () {
        var body = $('body');
        
        /* make sure menu is hidden by default */
        it('is hidden by default', function () {
          expect(body.hasClass('menu-hidden')).toEqual(true);
        });  
        
        describe('icon click', function () {
          var menuIcon = $('.menu-icon-link');
          
          /* first click on icon menu shows menu */
          it('shows menu', function () {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).not.toEqual(true);
          });

          /* second click on icon menu hides menu */
          it('hides menu', function () {
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toEqual(true);
          });
        });
    });
    
    describe('Initial entries', function () {
        /* call loadFeed on first feed and wait until it finishes loading
           before proceeding with the test suite */
        beforeEach(function (done) {
          loadFeed(0, done);
        });
        
        /* after loadFeed completes make sure we have at least one
           .entry element inside feed container */
        it('load properly', function () {
          expect($('.feed').find('.entry').length).not.toBe(0);
        });
    });
    
    describe('New Feed Selection', function () {
        var feedContainer = $('.feed'),
          content;
      
        /* make sure we have loaded some feed before executing test suite */
        beforeEach(function (done) {
          loadFeed(0, function () {
            content = feedContainer.html();
            done();
          });
        });

        describe('after load', function () {
          /* now call loadFeed to load another feed */
          beforeEach(function (done) {
            loadFeed(1, done);
          });
          
          /* after loadFeed completes make sure content has changed */
          it('changes the content', function () {
            expect(feedContainer.html()).not.toEqual(content);
          });
        });
    });
}());
