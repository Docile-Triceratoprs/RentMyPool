var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;

var Navigation = React.createClass({

  getInitialState: function(){
      return { focused: 0 };
  },

  clicked: function(index){
    this.setState({focused: index});
  },

  render: function () {
    return (
      <div className="nav-menu">
        { this.props.items.map(function(m, index){
            return <Link key={index} activeClassName="nav-link-focused" className="nav-link" to={m.name}>{m.name}</Link>;
          }) }
      </div>
    );
  }
});

var Main = React.createClass({

  render: function () {
    return (
      <div className="viewPort">

        <Navigation items={ [
          {name:'Home'},
          {name:'Rent'},
          {name:'List'},
          {name:'Img Upload'},
          {name: 'Login'}
        ] } />
        <div className="main">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

var routing = function () {
  var routes = (
        <Route path="/" handler={Main}>
          <Route name="Home" handler={Content} />
          <Route name="Rent" handler={RentContent} />
          <Route name="List" handler={ListContent} />
          <Route name="Img Upload" handler={ImgUploadContent} />
          <Route name="Login" handler={LoginContent} />
          <Route name="Sign Up" handler={SignUpContent} />
          <DefaultRoute handler={Content} />
        </Route>
      );

  ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
    React.render(<Handler />, $('body')[0]);
  });
};



