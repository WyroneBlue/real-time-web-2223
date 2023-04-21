console.log("Wagwan from order.js!");
const socket = io();

const form = document.querySelector('form');
const button = document.querySelector('form button');
console.log(button);

button.addEventListener('click', async(e) => {
    e.preventDefault();
    console.log("Wagwan from order.js!");
    console.log(form);
    const items = [
        {
            name: 'Pizza',
            quantity: 2
        },
        {
            name: 'Burger',
            quantity: 1
        }
    ]

    // wait for order to save
    setTimeout(async() => {
        console.log('Order saved!');
        await socket.emit('new-order', {
            items,
            table: 39
        });
    }, 1000);
});
