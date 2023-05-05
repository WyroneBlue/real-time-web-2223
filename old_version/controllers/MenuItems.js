import { supabase } from "../utils/db.js";

const menuItemsTable = "menu_items";

export const allFood = async(req, res) => {

    // Get menu items where join table menu_item_categories is not equal to drinks
    const { data: menu_items, error } = await supabase
    .from(menuItemsTable)
    .select('*, menu_item_categories!inner(*)')
    .neq('menu_item_categories.slug', 'drinks');

    if (error) {
        res.status(500).json({ error: error.message });
    }

    // round price to 2 decimal places
    return menu_items.map(item => {
        item.price = item.price.toFixed(2);
        return item;
    });
}

export const foodById = async(req, res) => {

    const { data: menu_item, error } = await supabase
    .from(menuItemsTable)
    .select('*')
    .eq('id', req.params.id)
    .single();

    if (error) {
        res.status(500).json({ error: error.message });
    }

    // round price to 2 decimal places
    menu_item.price = menu_item.price.toFixed(2);

    return menu_item;
}
