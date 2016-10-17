/**
 * Test file for Job: google-maps-route
 */

var assert = require ('assert');
var google_maps_route_SUT = require('../google-maps-route');

var mockedConfig, mockedDependencies;

describe ('google-maps-route test', function(){

  beforeEach(function (done) {

    mockedConfig = {
      globalAuth: {
        myconfigKey: {
          username: "myusername",
          password: "secretpassword"
        }
      },
      interval: 20000
    };

    mockedDependencies = {
      logger: console,
      easyRequest : {
        JSON : function (options, cb) {
          cb(null, {});
        }
      }
    };

    done();
  });

  it('should have tests :D', function (done){
    assert.ok(false, 'we don\'t have any tests :(');
    done();
  });

  describe ('config checks', function(){
    it('should check for valid credentials', function (done){
      // there are some nice examples of how to unit tests configuration handling
      // in the Atlassian package:
      // https://bitbucket.org/atlassian/atlasboard-atlassian-package/src/master/jobs
      done();
    });
  });

  describe ('http request example tests', function(){
    it('should handle server errors', function (done){

      mockedDependencies.easyRequest.HTML = function (options, cb){
        cb(null, 'hello from google');
      };

      var config = {};
      google_maps_route_SUT.onRun(config, mockedDependencies, function(err, data){
        assert.equal(data.html, 'hello from google', 'expected a different reply from google: ' + data.html);
        done();
      });
    });
  });

});
