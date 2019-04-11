const shoppingItems = [
	{ name: 'Chicken', amount: '1' },
	{ name: 'Salmon', amount: '1' },
	{ name: 'Milk', amount: '3' },
  { name: 'Beef', amount: '3' },
  { name: 'CatFood', amount: '1' }
];

const ShoppingItemModel = Backbone.Model.extend({
	defaults: {
		name: null, amount: null,
		edit: false, changeName: null, changeAmount: null
	},
	editMode: function() {
		this.set({
			edit: true,
			formName: this.get('name'),
			formAmount: this.get('amount')
		});
	},
	saveEditModel: function() {
		this.set({
			edit: false,
			name: this.get('formName'),
			amount: this.get('formAmount')
		});
	},
});
const ShoppingItemCollection = Backbone.Collection.extend({
	model: ShoppingItemModel
});

let shoppingItemCollection = new ShoppingItemCollection(shoppingItems);

const ShoppingItemView = Backbone.View.extend({

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
  tag: 'li',
	render: function() {
		let name = this.model.get('name');
		let amount = this.model.get('amount');
		let edit = `<span class="edit">🖊️</span>`;
		let remove = `<span class="remove">🗑️</span>`;
		let viewContent;
		if( this.model.get('edit') === true) {
      let save = `<span class="save">✔️</span>`;
			let formName = this.model.get('formName');
      let formAmount = this.model.get('formAmount');
			viewContent = `
      <input class="editName" value="${formName}" />
      <input class="editAmount" value="${formAmount}" />
       ${save}`;
		} else {
			viewContent = `${name} - Amount To Buy: (${amount}) - ${edit} ${remove}`;
		}
		this.$el.html(viewContent);  // this.$el är ett li-element
	},
	events: {
		"click .remove": 'remove',
		"click .edit": 'editMode',
		"click .save": 'saveChanges',
		"change .editName": 'editName',
		"change .editAmount": 'editAmount'
	},
	remove: function(event) {
		shoppingItemCollection.remove(this.model);
	},
	editMode: function(event) {
		this.model.editMode();
	},
	saveChanges: function(event) {
		this.model.saveEditModel();
	},
	editName: function(event) {
		this.model.set({ formName: event.target.value });
	},
	editAmount: function(event) {
		this.model.set({ formAmount: event.target.value });
	}
})

const ShoppingItemsView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
		this.listenTo(this.collection, 'change', this.render);
	},
	render: function() {
		let el = this.$el;
		let ul = $('<ul></ul>')
		this.collection.forEach(function(item) {
			let shoppingItemView = new ShoppingItemView({ model: item });
			shoppingItemView.render();
			ul.append(shoppingItemView.$el);
		});
		el.html('');
		el.append(ul);
		let addForm = `<input id="addNewItem" placeholder="Add product">
		<input id="addNewAmount" placeholder="Add Amount">
		<button id="addToCartButton">Add to Cart</button>`;
		el.append(addForm);
	},
	events: {
		"click #addToCartButton": 'addItemToCart',
		"change #addNewItem": 'addNewItem',
		"change #addNewAmount": 'addNewAmount'
	},
	addItemToCart: function(event) {
		let newItemModel = new ShoppingItemModel({

			name: this.newForm.name,
			amount: this.newForm.amount
		});
		this.collection.add(newItemModel);
	},
	newForm: { name: '', amount: '' },
	addNewItem: function(event) { this.newForm.name = event.target.value; },
	addNewAmount: function(event) { this.newForm.amount = event.target.value; }
})


$(document).ready(function() {
	let shoppingItemsView = new ShoppingItemsView({
		collection: shoppingItemCollection,
		el: '#ShoppingCart'
	});
	shoppingItemsView.render();
});
