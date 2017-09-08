//helper.js

module.exports = {
    getRandomString: function(length) {
        var string = '';
        var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (i = 0; i < length; i++) {
            string += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return string;
    },
    getRandomNumber: function(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    },
    trimResult: function(toTrim) {
        return toTrim.then(function(val){
            return val.trim();
        });
    },
    parseResultToInteger: function(toParse) {
        return toParse.then(function(val){
            return parseInt(val);
        });
    }
};