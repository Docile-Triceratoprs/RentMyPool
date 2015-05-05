var testData = [{name : 'John', address : 'San Francisco', price : '1.00'},
  {name : 'David', address : 'Germany', price : '600000000.00'}];


var Listings = React.createClass({

  render: function () {

    var listItems = this.props.data.map(function (item, index) {
      return (
        <div className="listEntry" onClick={codeAddress.bind(null,item.address)}>
        {item.name +' - ' + item.address + ' - ' + item.price}
        </div>
      );
    });

    return (
      <div className="listings">
        {listItems}
      </div>
    );
  }
});


var RentContent = React.createClass({

  getInitialState: function () {
    return {
      data: []
    };
  },

  componentDidMount: function () {
    initializeMap();
    $.get("/rentItems", function (data) {
      console.log("GET Success", data);
      this.setState({data:data.results});
    }.bind(this));
  },
  
  render: function () {
    
    return (
      <div>
        <h1>Rent a Pool</h1>
        <Listings data={this.state.data} />
        <div id="map-canvas"></div>
      </div>
    );
  }
});




var geocoder;
var map;
var oldMarker;

function initializeMap() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 14,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function codeAddress(address) {
  if (oldMarker) oldMarker.setMap(null);
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
      oldMarker = marker;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
