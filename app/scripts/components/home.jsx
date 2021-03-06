var React = require("react");
var ReactDOM=require("react-dom");
var Backbone = require("backbone");
var $ = require("jquery")
var Input = require("react-bootstrap/lib/Input")
var Parse = require("parse")
var LoginForm=require("./login.jsx")



var Home = React.createClass({
  componentDidMount(){
    var self=this;
    ReactDOM.render(<LoginForm parent={self} />,document.getElementById("signFloat"))
  },
  getInitialState:function(){
      return {
        "currentUser":Parse.User.current(),
      }
    },
  handleShowLogin:function(){
    $(".signFloat").removeClass("hidden")
    },
  handleLogin:function(){
     this.setState({"currentUser":Parse.User.current()})
  },
  handleLogOut:function(){
    Parse.User.logOut();
     this.setState({"currentUser":""})
  },
  handleEvent:function(e){
    e.preventDefault();
    var startDate = $("#startDate").val();
    var endDate=$("#endDate").val();
    Backbone.history.navigate("searchEvent/" + startDate + "_" + endDate,{trigger:true})
  },
  handleCard:function(e){
    e.preventDefault();

    var cardName = $("#buyCardName").val();
    Backbone.history.navigate("searchCard/" + cardName,{trigger:true})
  },
  handleSellCard:function(e){
    e.preventDefault();


    var cardName = $("#sellCardName").val();
    Backbone.history.navigate("sellCard/" + cardName,{trigger:true})
  },
  handleStore:function(e){
    e.preventDefault();
        Backbone.history.navigate("store/" + $("#storeName").val(),{trigger:true})
  },
  handleSpecial:function(e){
    e.preventDefault();
    Backbone.history.navigate("tagSearch/" + $("#tagSearch").val(),{trigger:true})
  },
  render:function(){
      var currentUser = this.state.currentUser
      var storeSight = ""
      var logContents = [<li onClick={this.handleShowLogin} id="headerUser"><a>Log In</a></li>,
        <li><a href="#signUp">Sign Up</a></li>,
        <li><a href="#register">Register Store</a></li>
      ]
      console.log(logContents)

      if(currentUser){

          logContents =[<li onClick={this.handleLogOut} id="headerUser"><a>Log Out</a></li>,
            <li><a href="#checkout">CheckOut</a></li>,
            <li><a href="#orders">Your Orders</a></li>]

          if(currentUser.get("hasStore")){
              logContents.push(<li><a href="#owner">Manage Store</a></li>)
          }
      }
    return(
  <div className="Total">
    <div id="signFloat" className="hidden signFloat col-xs-6 col-md-3 col-md-offset-4"></div>
    <div className="header row">
      <div className="col-md-4 col-md-offset-4 title"><h1>Gaming Local</h1></div>
    </div>
    <div className="row">
      <div className="col-xs-12 col-xs-offset-1">
      <div className="list-inline nav nav-tabs tabs">
        {logContents}
            {storeSight}
      </div>
    </div>
    </div>

    <div className="row">
      <div className="col-md-5 homeEvent home infoContainer">
        <div className="row"><h2>Events</h2></div>
          <p>Search by Date</p>
          <form id="eventDate" onSubmit={this.handleEvent} action="" className="form-events">
              <div className="col-xs-6">
                <label>StartDate</label>
                  <p><input id="startDate" type="date" name="startDate" placeholder="Start Date"/></p>
              </div>
              <div className="col-xs-6">
                <label>EndDate</label>
                  <p><input id="endDate" type="date" name="endDate" placeholder="End Date"/></p>
              </div>
                  <p><button className="btn btn-primary Search">Search</button></p>
          </form>
      </div>

      <div className="col-md-5 homeSpecials home infoContainer">
        <div className="row"><h2>Specials</h2></div>
          <p>Search by Tags</p>
          <form onSubmit={this.handleSpecial} id="cardSearch" action="" className="form-events">
                  <input id="tagSearch" type="text" name="cardName" placeholder="Keyword to search"/>
                  <p><button className="btn btn-primary Search">Search</button></p>
          </form>
          <a href="#specials">See all specials</a>
      </div>
    </div>

    <div className="row">
      <div className="col-md-5 homeCards home infoContainer">
        <h2>Store Pricing</h2>
        <div className="col-xs-6">
          <div className="row"><h4>Check store prices for buying cards</h4></div>
            <form onSubmit={this.handleCard} id="cardSearch" action="" className="form-events">
                    <input id="buyCardName" type="text" name="cardName" placeholder="Name of Card"/>
                    <p><button className="btn btn-primary Search">Search</button></p>
            </form>
        </div>
        <div className="col-xs-6"><h4>Check store prices for selling your cards</h4>
            <p><button onClick={this.handleSellCard} className="btn btn-primary Search">Build List</button></p>
        </div>



      </div>

      <div className="col-md-5 homeStores home infoContainer">
        <div className="row"><h2>Search for Stores near you!</h2></div>
          <p>Search by Name</p>
        <form onSubmit={this.handleStore} id="storeSearch" action="" className="form-events">
                <input id="storeName" type="text" name="storeName" placeholder="Name of Store"/>
                <p><button className="btn btn-primary Search">Search</button></p>
        </form>
        <div><a href="#allStores">View all Stores</a></div>
      </div>
    </div>

    <div className="footer row">
    <p>This website was created and is maintained by Jake Murphy</p>
    <p>Contact him for any web development and design jobs</p>
    <p>jakemurphys1@gmail.com</p>
    <p><a href="http://jakemurphywebdesigner.com/">jakemurphywebdesiger.com</a></p>
      </div>
  </div>
)
  },
})

module.exports=Home;
