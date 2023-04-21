console.log("Wagwan from order.js!");
const socket = io();

const drinks = document.querySelector('section#drinks ul');
const food = document.querySelector('section#food ul');

socket.on('new-order', (data) => {
    console.log(data);

    let html = `<h3>Table: #${data.table}</h3>`;

    html += `<ul>`;
    data.items.forEach(item => {
        console.log(item);
        html += `
        <li>
            <span>${item.name} - ${item.quantity}</span>
        </li>`;
    });

    html += `</ul>`;

    const li = document.createElement('li');
    li.innerHTML = html;
    li.classList.add('new-order');
    food.appendChild(li);
});
