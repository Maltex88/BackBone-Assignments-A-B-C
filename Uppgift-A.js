

const UserLogginModel = Backbone.Model.extend({
  defaults: {
    isLoggedIn: false
  },

  toggle: function() {
    let state = this.get('isLoggedIn');
    if(state === false) {
      this.set({ isLoggedIn: true});
    } else {
      this.set({ isLoggedIn: false})

    }
  }
});


let userLogginModel = new UserLogginModel({});

const UserLogginView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function(){
    let status = this.model.get('isLoggedIn');
    let statusPrint = '';
    if(status === true)
      statusPrint = 'Inloggad';
    else {
       statusPrint = 'Utloggad'
    }
    let html = `<div id="logginDiv">
       <button id="loggMeInButton">${statusPrint}</button>
    </div>`;
    this.$el.html(html);
  },
  events: {
    "click #loggMeInButton": 'userLogginLoggout'
  },
  userLogginLoggout: function(event) {
    this.model.toggle();
  },
})


$(document).ready(function() {
  let userLogginView = new UserLogginView({
 	  model: userLogginModel,
 		el: '#logginDiv'
 	});
 	userLogginView.render();
 });
