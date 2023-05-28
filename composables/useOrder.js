export const useOrder = (order = []) => useState('order', () => order)

export const updateOrder = (item, quantity) => {
    const order = useOrder()
    order.value.push({
        ...item,
        quantity
    })
}

export const updateOrderQuantity = (id, quantity) => {
    const order = useOrder()
    order.value = order.value.map(item => {
        if (item.id === id) {
            item.quantity = parseInt(quantity);
        }
        return item;
    })
}

export const removeItemById = (id) => {
    const order = useOrder()
    order.value = order.value.filter(item => item.id !== id)
}

export const clearOrder = () => {
    const order = useOrder()
    order.value = []
}