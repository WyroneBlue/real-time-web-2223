console.log("Wagwan from order.js!");
const socket = io();

const param = new URLSearchParams(window.location.search);
const tableId = param.get('table');

const form = document.querySelector('form');
const addButtons = document.querySelectorAll('form label button');

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
        const name = input.dataset.name;
        const slug = input.name;
        const isDuplicate = order.find(item => item.name === name);
        if(isDuplicate) {
            isDuplicate.quantity = parseInt(isDuplicate.quantity) + parseInt(input.value);
        } else {
            order.push({
                name,
                slug,
                quantity: parseInt(input.value)
            });
        }
        input.value = 1;

        console.log('order', order);
        console.dir('form', form)
    });
});

submitButton.addEventListener('click', async(e) => {
    e.preventDefault();

    submitButton.disabled = true;
    setTimeout(() => {

        submitButton.disabled = false;
    }, 1000);

    await submitOrder();
});

const submitOrder = async(e) => {
    // wait for order to save
    setTimeout(async () => {
        console.log('Order saved!');
        await socket.emit('new-order', {
            order,
            table: tableId
        });
    }, 1000);
}

