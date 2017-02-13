
var Component = require('../base/component.js');
var template = require('./photoMask.html');
var _ = require('../base/util.js');

var PhotoMask = Component.extend({
    template: template,
    config: function(data){
        _.extend(this.data,data)
    },
    init: function(){

    },
    close: function(result) {
        this.destroy();
    }
})
module.exports = PhotoMask;