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
    }
};