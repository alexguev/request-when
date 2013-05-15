var _request = require('request'),
    fn = require('when/function'),
    nodefn = require('when/node/function');

function first(result) {
    if (Array.isArray(result)) {
        return when.resolve(result[0]);
    } else {
        return when.resolve(result);
    }
}

function error(resp) {
    if (resp.statusCode >= 200 && resp.statusCode <= 299) {
        return when.resolve(resp);
    } else {
        return when.reject({message: 'Error status code.', resp: resp});
    }
}

var request = fn.compose(nodefn.lift(_request), first, error);

request.get = request;

request.put = fn.compose(nodefn.lift(_request.put), first, error);

request.post = fn.compose(nodefn.lift(_request.post), first, error);

request.del = fn.compose(nodefn.lift(_request.del), first, error);

request('http://www.google.com')
    .then(function (resp) {
        console.log('GOOD');
    })
    .otherwise(function (err) {
        console.log('BAD');
    });

