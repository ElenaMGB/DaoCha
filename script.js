document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const products = [
        { category: 'chinese-tea', name: 'Зелёный чай', description: 'Классический китайский зелёный чай с насыщенным вкусом и ароматом.', img: 'https://source.unsplash.com/random/300x200?tea' },
        { category: 'chinese-tea', name: 'Чёрный чай', description: 'Традиционный китайский чёрный чай с ярким вкусом и ароматом.', img: 'https://source.unsplash.com/random/300x200?black-tea' },
        { category: 'herbal-tea', name: 'Ромашковый чай', description: 'Успокаивающий чай из ромашки, идеально подходит для вечернего чаепития.', img: 'https://source.unsplash.com/random/300x200?herbal-tea' },
        { category: 'herbal-tea', name: 'Мятный чай', description: 'Освежающий чай из мяты, идеален для утреннего заряда бодрости.', img: 'https://source.unsplash.com/random/300x200?mint-tea' },
        { category: 'non-tea-drinks', name: 'Каркаде', description: 'Освежающий напиток из лепестков гибискуса, богатый витаминами.', img: 'https://source.unsplash.com/random/300x200?drink' },
        { category: 'non-tea-drinks', name: 'Лемонграсс', description: 'Ароматный и освежающий напиток из лемонграсса, известный своими полезными свойствами.', img: 'https://source.unsplash.com/random/300x200?lemongrass' },
        { category: 'spices', name: 'Корица', description: 'Ароматная и вкусная корица для вашего чая и выпечки.', img: 'https://source.unsplash.com/random/300x200?spices' },
        { category: 'spices', name: 'Имбирь', description: 'Свежий имбирь, идеально подходит для приготовления чая и блюд.', img: 'https://source.unsplash.com/random/300x200?ginger' },
    ];

    function renderProducts() {
        products.forEach(product => {
            const section = document.getElementById(product.category);
            const div = document.createElement('div');
            div.className = 'bg-white rounded shadow-md p-4';
            div.innerHTML = `
                <img src="${product.img}" alt="${product.name}" class="w-full h-48 object-cover rounded mb-4">
                <h3 class="text-xl font-semibold">${product.name}</h3>
                <p class="mb-4">${product.description}</p>
                <button class="bg-green-600 text-white px-4 py-2 rounded" onclick="addToCart('${product.name}')">Добавить в корзину</button>
            `;
            section.querySelector('.grid').appendChild(div);
        });
    }

    function renderCart() {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center border-b border-gray-300 py-2';
            li.innerHTML = `
                <span>${item.name} - ${item.quantity}</span>
                <div>
                    <button class="bg-green-600 text-white px-2 py-1 rounded" onclick="increaseQuantity(${index})">+</button>
                    <button class="bg-red-600 text-white px-2 py-1 rounded" onclick="decreaseQuantity(${index})">-</button>
                </div>
            `;
            cartItems.appendChild(li);
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    window.increaseQuantity = function(index) {
        cart[index].quantity++;
        renderCart();
    }

    window.decreaseQuantity = function(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        renderCart();
    }

    window.addToCart = function(name) {
        const item = cart.find(i => i.name === name);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ name: name, quantity: 1 });
        }
        renderCart();
    }

    document.getElementById('clear-cart').addEventListener('click', function() {
        cart.length = 0;
        renderCart();
    });

    // Форма заявки на чай
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log('Форма отправлена', data);
        alert('Заявка отправлена!');
    });

    renderProducts();
    renderCart();

    // Статистика уникальных просмотров (используем localStorage)
    if (!localStorage.getItem('uniqueViews')) {
        localStorage.setItem('uniqueViews', JSON.stringify([]));
    }
    const uniqueViews = JSON.parse(localStorage.getItem('uniqueViews'));
    const currentDate = new Date().toDateString();
    if (!uniqueViews.includes(currentDate)) {
        uniqueViews.push(currentDate);
        localStorage.setItem('uniqueViews', JSON.stringify(uniqueViews));
    }
    console.log('Уникальные просмотры:', uniqueViews.length);
});
