var _request = require('request'),
    when = require('when'),
    pipeline = require('when/pipeline'),
    fn = require('when/function'),
    nodefn = require('when/node/function');

var response = function (results) {
    return when.resolve(results[0]);
}

var error = function (resp) {
    console.log(resp.statusCode)
    if (resp.statusCode >= 200 && resp.statusCode <= 299) {
        return when.resolve(resp);
    } else {
        return when.reject({message: 'Error status code.', statusCode: resp.statusCode});
    }
}

var request = nodefn.lift(_request);

request.get = request;

request.put = nodefn.lift(_request.put);

request.post = nodefn.lift(_request.post);

request.del = nodefn.lift(_request.del);

var f = fn.compose(request, response, error);

f('http://www.google.com')
    .then(function (resp) {
        console.log('GOOD');
        console.log(resp.length);
    })
    .otherwise(function (err) {
        console.log('BAD');
        console.log(err.length);
    });


_request('http://www.google.com', function (error, response, body) {
 if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
  }
})


