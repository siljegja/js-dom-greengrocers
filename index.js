const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};


function renderStoreItems() {
  const container = document.querySelector('.store--item-list')
  container.innerHTML = '';

  state.items.forEach(item => {
    // create list element
    const li = document.createElement('li');

    // create div element
    const div = document.createElement('div');
    div.className = 'store--item-icon';

    // create image element
    const img = document.createElement('img');
    img.src = `assets/icons/${item.id}.svg`;
    img.alt = item.name;

    // create button element
    const button = document.createElement('button');
    button.textContent = 'Add to cart';
    button.addEventListener('click', () => {
      addToCart(item);
    })

    // append image to div
    div.appendChild(img);

    // append div and button to li
    li.appendChild(div);
    li.appendChild(button);

    // add list to the container
    container.appendChild(li);
  });
}

renderStoreItems()



function renderCartItems() {
  const container = document.querySelector('.cart--item-list')
  container.innerHTML = ''

  state.cart.forEach(item => {
    const li = document.createElement('li')
    li.innerHTML = `
        <img class="cart--item-icon" src="assets/icons/${item.id}.svg" alt="${item.name}" />
        <p>${item.name}</p>
        <button class="quantity-btn remove-btn center">-</button>
        <span class="quantity-text remove-btn center">${item.quantity}</span>
        <button class="quantity-btn add-btn center">+</button>
    `;

    li.querySelector('.add-btn').addEventListener('click', () => increaseItem(item.id))
    li.querySelector('.remove-btn').addEventListener('click', () => decreaseItem(item.id))

    container.appendChild(li)
  })

  totalCost();
}


function addToCart(item) {
  // check if item exists
  const cartItem = state.cart.find(i => i.id === item.id);

  // check if item exists
  if (cartItem) {
    cartItem.quantity++ // increase item's quantity if exists
  } else {
    state.cart.push({...item, quantity : 1}); 
  }

  renderCartItems();

}


function increaseItem(id) {
  // find the item to increase
  const item = state.cart.find(i => i.id === id);

  // increase the quantity
  item.quantity++;

  renderCartItems();
}


function decreaseItem(id) {
  // find item
  const item = state.cart.find(i => i.id === id);

  // decrease quantity
  item.quantity--;

  // remove item from cart if quantity is 0
  if (item.quantity === 0) {
    const itemIndex = state.cart.findIndex(i => i.id === id);
    state.cart.splice(itemIndex, 1);
  }

  renderCartItems();
}


function totalCost() {

  // find total cost
  let totalCost = 0;

  state.cart.forEach(item => {
    totalCost += item.price * item.quantity;
  })

  // container for total cost 
  const container = document.querySelector('.total-number')
  container.innerHTML = ''

  // create span element
  const span = document.createElement('span');
  span.textContent = totalCost.toFixed(2);

  // append span to container
  container.appendChild(span);

}