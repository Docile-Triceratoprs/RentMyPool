var ListEntryStore = Reflux.createStore({
  
  init: function () {
    this.listenTo(Actions.entryClicked, this.onEntryClicked);
  },

  onEntryClicked: function (props) {
    this._emit(props)
  },

  _emit: function (props) {
    this.trigger(props);
  }
});

var ListStore = Reflux.createStore({
  
  init: function () {
    this.listenTo(Actions.getRentItems, this.onGetRentItems);
  },

  onGetRentItems: function () {
    $.get("/rentItems", function (data) {
      console.log("GET Success", data);
      this._emit(data.results);
    }.bind(this));
  },

  _emit: function (data) {
    this.trigger(data);
  }
});

var GoogleMapsStore = Reflux.createStore({

  init: function () {
    this.listenTo(ListEntryStore, this.updateMap)
    this.listenTo(Actions.mapWillMount, this.onMapWillMount);
    this.listenTo(Actions.codeAddress, this.onCodeAddress);
    this.geocoder = new google.maps.Geocoder();
    this.oldMarkers = [];
    this.map = null;
    this.addr = null;
  },
  updateMap: function (props) {
    this.addr = props.address;
    this.trigger(this.addr);
  },

  onCodeAddress: function () {
    var self = this;
    for(var i = 0; i < this.oldMarkers.length; i++)
      this.oldMarkers[i].setMap(null);
    this.geocoder.geocode( { 'address': this.addr}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        self.map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: self.map,
            position: results[0].geometry.location
        });
        self.oldMarkers.push(marker);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  },

  onMapWillMount: function (addr) {
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 14,
      center: latlng
    }
    this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    this.addr = addr;
  }
});
