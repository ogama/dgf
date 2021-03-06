var dgf = require('../');
var assert = require('chai').assert;
var expect = require('chai').expect;
var check = require("check-type");

describe('model', function () {
    describe('#methods', function () {
               
        
        it('should return a new model with basic functions', function () {
            
            var model = dgf.newModel(); 
            
            assert.isDefined(model);
            assert.isObject(model.entities);
            assert.isArray(model.generators);
            assert.isObject(model.outputs);
            assert.isFunction(model.addEntity);
        });
    });
    
    describe('#addEntity', function () {
        
        it ('should add new entity in model', function () {
            
            var model = dgf.newModel(); 
            
            model.addEntity('entityName',  {
               field: 'constant'
            });
            
            assert.isObject(model.entities);
            assert.property(model.entities, 'entityName');
            assert.isArray(model.generators);
            assert.isObject(model.outputs);
        });
        
        it ('should throw exception when entity is added twice', function () {
            var model = dgf.newModel(); 
            var entity = {
               field: 'constant'
            };
            var entityName = 'entityName';
            
            model.addEntity(entityName, entity);
            
            expect(function() {
                model.addEntity(entityName, entity);
            }).to.throw(Error, /Entity entityName already exists in model/);
        });
        
        it ('should throw error when object is passed as entity name', function () {
            var model = dgf.newModel(); 
            var entity = {
               field: 'constant'
            };
            var entityName = {};
            
            expect(function() {
                model.addEntity(entityName, entity);
            }).to.throw(Error, /entityName must be a string/);
        });
    });
    
    describe('#addOutput', function () {
        it ('should add new output in model', function () {
            
            var model = dgf.newModel(); 
            
            model.addOutput('newOutput',  dgf.outputs.stdout());
            
            assert.isObject(model.entities);
            assert.isArray(model.generators);
            assert.isObject(model.outputs);
            assert.property(model.outputs, 'newOutput');
            assert.isTrue(check(model.outputs['newOutput']).matches({
                write: 'function'
            }));
        });
    });
    
    describe('#addGenerator', function () {
        it ('should add new generator in model', function () {
            
            var model = dgf.newModel();
            
            model.addOutput('newOutput',  dgf.outputs.stdout());
            
            model.addEntity('entityName',  {
               field: 'constant'
            });
            
            var generatorToAdd = {
                entity: 'entityName',
                output: 'newOutput',
                formater: dgf.formatters.csv({
                    separator: ';',
                    headers: true
                }),
                behavior: dgf.behaviors.times(100000)
            };
            
            model.addGenerator(generatorToAdd);
            
            assert.isArray(model.generators);
            assert.property(model.generators, generatorToAdd.entity);
            assert.isArray(model.generators[generatorToAdd.entity]);
            assert.include(model.generators[generatorToAdd.entity], generatorToAdd);
        });
    });
});