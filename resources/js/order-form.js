console.log("Wagwan from order.js!");
const socket = io();

const form = document.querySelector('form');
const addButtons = document.querySelectorAll('form label button');
console.log(addButtons);

const submitButton = document.querySelector('form > button');

let order = [];
addButtons.forEach(button => {
    button.addEventListener('click', async(e) => {
        e.preventDefault();

        e.target.disabled = true;
        setTimeout(() => {
            e.target.disabled = false;
        }, 1000);

        const input = e.target.closest('label').querySelector('input');

        const isDuplicate = order.find(item => item.name === input.name);
        if(isDuplicate) {
            isDuplicate.quantity = parseInt(isDuplicate.quantity) + parseInt(input.value);
            console.log('order', order);
            return;
        } else {
            order.push({
                name: input.name,
                quantity: input.value
            });
        }
        input.value = 1;

        console.log('order', order);
        console.dir('form', form)
    });
});

const submitOrder = async(e) => {
    // wait for order to save
    setTimeout(async () => {
        console.log('Order saved!');
        await socket.emit('new-order', {
            order,
            table: 39
        });
    }, 1000);
}

