define(['FlatsManager',
		'app/flats/new_view'], 
function(FlatsManager, View){
	FlatsManager.module('ContactsApp.New', function(New, FlatsManager, Backbone, Marionette, $, _){
		New.Controller = {
		    newFlat: function() {
		        console.log('FlatsApp:NewController: method newFlat');
		        require(['entities/flat'], function() {
		            var newFlatModel = FlatsManager.request('flat:entity:new');
		            var newFlatView = new View.Flat({
		                model: newFlatModel
		            });
		            var newFlatLayout = new View.Layout();
		            newFlatLayout.on('show', function() {
		                newFlatLayout.mainRegion.show(newFlatView);
		            });
		            newFlatView.on('form:submit', function (data) {
		                newFlatModel.save(data, {
		                    success: function() {
		                        FlatsManager.navigate('#flats');
		                    },
		                    error: function() {
		                        alert('save error');
		                    }
		                });
		            });
		            FlatsManager.mainRegion.show(newFlatLayout);
		        });
		    }
		}
	});
	return FlatsManager.ContactsApp.New.Controller;
});