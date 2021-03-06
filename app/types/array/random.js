var check = require('check-type');
var extend = require('extend');
var random = require('random-js');

var AbstractType = require('../abstract.js');
var utils = require('../../utils.js');

module.exports = function (options) {
    if (!check(options).has('from')
        || !check(options).has('to')
        || !check(options).has('object')) {
        
        throw new Error('Options for array.random must match {from:integer,to:integer,object:object}');
    }
    
    return extend({}, AbstractType, {        

        min: options.from,
        max: options.to,
        template: options.object,
        distribution: null,
        
        getValue: function (model) {
                        
            if (this.distribution == null) {
                this.distribution = random.integer(this.min, this.max);
            }
                        
            var array = [];
            var maxGenerated = this.distribution(model.getEngine());
            
            for (var i = 0; i < maxGenerated; i++) {
                                
                array.push(utils.generateEntityFrom(this.template, model).object);
            }
            
            return array;
        }
    });   
};