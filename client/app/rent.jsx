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
    var self = this;
    $.ajax({
      url: "/rent",
      method: "GET",
      contentType: "application/json",
      data: JSON.stringify('2015/05/06'),
      success: function (data){
        console.log("GET Successful.");
        self.setState({data:data.results});
      },
      error: function (err) {
        console.log("Error:", err)
      }
    });
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
