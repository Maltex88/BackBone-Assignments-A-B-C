

const numberOfTabs = [ '<button id="tabClass1">First tab</button>' + '<button id="tabClass2">Second tab</button>' + '<button id="tabClass3">Third tab</button>'];
const tabContent = [ `Detta är Vy 1 <button class="Forward">Forward</button>`, `<button class="Backwards">Backwards</button> Detta är vy 2 <button class="Forward">Forward</button>`, ` <button class="Backwards">Backwards</button> Detta är vy 3 <button class="Forward">Forward</button>`  ];

const TabModel = Backbone.Model.extend({
   defaults: {selectedTab: 0}
});

let tabModel = new TabModel({

});


const ContentDiv = Backbone.View.extend({
  render: function(){
    let mainViewText = `<div class="mainView">${this.model.get('content')}</div>`;
    this.$el.html('')
    this.$el.append(`${numberOfTabs}`)
    this.$el.append(mainViewText);
  }
});
const ContentModel = Backbone.Model.extend({ });

const ShowContentDiv = Backbone.View.extend({
  initialize: function() {
  this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    let selectedTab = this.model.get('selectedTab');
    let model = new ContentModel({ content: tabContent[selectedTab] });
    let view = new ContentDiv ({ model: model });
    view.render();
    this.$el.html(view.$el);
  },
  events: {
		"click #tabClass1": 'ButtonClicker1',
    "click #tabClass2": 'ButtonClicker2',
    "click #tabClass3": 'ButtonClicker3',
    "click .Forward": 'TabForward',
    "click .Backwards": 'TabBackwards',
	},
  TabForward: function(event) {
    let selectedTab = this.model.get('selectedTab');
    selectedTab ++;
    this.model.set({selectedTab: `${selectedTab}`})
    if(selectedTab > 2)
      this.model.set({selectedTab: 0})

  },
  TabBackwards: function(event) {
    let selectedTab = this.model.get('selectedTab');
    selectedTab --;
    this.model.set({selectedTab: `${selectedTab}`})

  },
  ButtonClicker1: function(event) {
    let selectedTab = this.model.get('selectedTab');
    this.model.set({selectedTab: 0})

  },
  ButtonClicker2: function(event) {
    let selectedTab = this.model.get('selectedTab');
    this.model.set({selectedTab: 1})

 },
  ButtonClicker3: function(event) {
    let selectedTab = this.model.get('selectedTab');
    this.model.set({selectedTab: 2})

 },

});

$(document).ready(function() {
  let showContentDiv = new ShowContentDiv({
    model: tabModel,
    el: '#Tabdiv'
  });

  showContentDiv.render();
});
