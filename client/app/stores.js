var ListEntryStore = Reflux.createStore({
  
  listenables: Actions,

  onEntryClicked: function (props) {
    this._emit(props)
  },

  _emit: function (props) {
    this.trigger(props);
  }
});

var ListStore = Reflux.createStore({
  
  listenables: [Actions.getRentItems],

  onGetRentItems: function () {
    $.get("/rentItems", function (data) {
      console.log("GET Success", data);
      this._emit(data);
    }.bind(this));
  },

  _emit: function (data) {
    this.trigger(data);
  }
});

