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


var GoogleMap = React.createClass({

  mixins: [Reflux.connect(GoogleMapsStore, "addr")],

  getInitialState: function () {
    return {addr: this.props.initialAddr};
  },

  componentWillMount: function () {
    Actions.mapWillMount.triggerAsync(this.state.addr)
  },

  render: function () {
    Actions.codeAddress.triggerAsync(this.state.addr);
    return ( 
      <div id="map-canvas">
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
    Actions.getRentItems.triggerAsync();
    this.listenTo(ListStore, this.renderData);
  },

  renderData: function (data) {
    this.setState({data: data});
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

