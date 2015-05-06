var Listings = React.createClass({

  render: function () {

    var listItems = this.props.data.map(function (item, index) {
      return <ListEntry name={item.name} address={item.address}  price={item.price} />
    });

    return (
      <div className="listings">
        {listItems}
      </div>
    );
  }
});


  var geocoder = new google.maps.Geocoder();
    var map;
    var oldMarker;
var GoogleMap = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return {addr: this.props.initialAddr};
  },

  updateMap: function (props) {
    this.setState({ addr: props.address });
  },

  codeAddress: function (address) {
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
  },

  componentDidMount: function () {

    this.listenTo(ListEntryStore, this.updateMap.bind(this))
    
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 14,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  },

  render: function () {
    return ( 
      <div id="map-canvas">
        {this.codeAddress(this.state.addr)}
      </div>
    );
  }

});

var RentContent = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function () {
    return {
      data: []
    };
  },
  componentWillMount: function () {
    this.listenTo(ListStore, this.renderData.bind(this));
    Actions.getRentItems.triggerAsync();
  },

  renderData: function (data) {
    this.setState({data:data.results});

  },
  
  render: function () {
    
    return (
      <div>
        <h1>Rent a Pool</h1>
        <Listings data={this.state.data} />
        <GoogleMap initialAddr="944 Market Street"/>
      </div>
    );
  }
});

