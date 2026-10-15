import Menu from "../models/menu.js";
const createMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, isAvailable } = req.body;
        const newMenuItem = new Menu({ name, description, price, category, imageUrl, isAvailable });
        await newMenuItem.save();
        res.status(201).json({ message: 'Menu item created successfully', menuItem: newMenuItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error(error);
    }
};
const getMenuItems = async (req, res) => {
    try{
        const menuItems = await Menu.find();
        res.json(menuItems);
    }
    catch(error){
        res.status(500).json({ message: 'Server error' });
        console.error(error);
    }
};
const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (menuItem) {
            res.json(menuItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }   
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error(error);
    }
};
const updateMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (menuItem) {
            menuItem.name = req.body.name || menuItem.name;
            menuItem.description = req.body.description || menuItem.description;
            menuItem.price = req.body.price || menuItem.price;
            menuItem.category = req.body.category || menuItem.category;
            menuItem.imageUrl = req.body.imageUrl || menuItem.imageUrl;
            menuItem.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : menuItem.isAvailable;
            const updatedMenuItem = await menuItem.save()
            res.json({ message: 'Menu item updated successfully', menuItem: updatedMenuItem });
        }else{
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {   
        res.status(500).json({ message: 'Server error' });
        console.error(error);
    }
};
const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (menuItem) {
            await menuItem.deleteOne();
            res.json({ message: 'Menu item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });  
        console.error(error);
    }
};
const totalMenuItems = async (req, res) => {
    try {
        const count = await Menu.countDocuments();
        res.json({ totalMenu: count });
    } catch (error) {
            res.status(500).json({ message: 'Server error' });
    }
};
export { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem, getMenuItemById, totalMenuItems };