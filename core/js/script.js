/* global L */

Wee.fn.make('Cartographer', {
	/**
	 * Creates the map using the ID you've provided, and sets image paths and
	 * attribution settings that we commonly use.
	 *
	 * @param {object} setup
	 * @return void
	 */
	init: function(setup) {
		var providerOptions = {
				attribution: Wee.view.render('cartographer.attribution'),
				id: setup.projectId,
				accessToken: setup.accessToken
			};

		this.map = L.map($('ref:' + setup.ref)[0]).setView(setup.startPoint, setup.startZoom);

		this.map.attributionControl.setPrefix(false);

		L.Icon.Default.imagePath = '/assets/modules/cartographer/img/';

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', providerOptions)
			.addTo(this.map);

		this.markers = {};
		this.circles = {};
	},

	/**
	 * Adds a marker to the map.
	 *
	 * @param {array} point The x/y location of the marker, and any options
	 * @param {string} markerId An identifier for this marker
	 * @return void
	 */
	addMarker: function(point, markerId) {
		var marker = L.marker([point.x, point.y], point.options);

		if (point.popup) {
			marker.bindPopup(point.popup.content, point.popup.options);
		}

		marker.addTo(this.map);

		this.markers[markerId] = marker;

		return this.markers[markerId];
	},

	/**
	 * Removes a marker from the map.
	 *
	 * TODO: Combine these into one method to remove any feature from map
	 * TODO: Handle boolean returns properly instead of always true
	 *
	 * @param {string} markerId The marker's identifier
	 * @return void
	 */
	removeMarker: function(markerId) {
		this.map.removeLayer(this.markers[markerId]);

		delete this.markers[markerId];

		return true;
	},

	/**
	 * Add a circle to the map.
	 *
	 * @param {[type]} centerPoint [description]
	 * @param {[type]} radius [description]
	 */
	addCircle: function(settings) {
		var circle = L.circle(settings.centerPoint, settings.radius);

		circle.addTo(this.map);

		this.circles[settings.id] = circle;
	},

	/**
	 * Remove a circle from the map.
	 *
	 * @param {string} identifier The circle's identifier
	 * @return boolean
	 */
	removeCircle: function(identifier) {
		this.map.removeLayer(this.circles[identifier]);

		delete this.circles[identifier];

		return true;
	}
});