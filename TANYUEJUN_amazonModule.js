let Inventory = [
    {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with USB receiver",
        price: 29.99,
        quantity: 120,
        status: "available"
    },
    {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches",
        price: 89.5,
        quantity: 45,
        status: "available"
    },
    {
        name: "Gaming Monitor",
        description: "27-inch 144Hz gaming monitor",
        price: 329.99,
        quantity: 0,
        status: "not available"
    },
    {
        name: "USB-C Cable",
        description: "1 meter fast charging USB-C cable",
        price: 9.99,
        quantity: 200,
        status: "available"
    },
    {
        name: "USB-A Cable",
        description: "1 meter fast charging USB-A cable",
        price: 9.99,
        quantity: 100,
        status: "available"
    },
    {
        name: "Laptop Stand",
        description: "Adjustable aluminum laptop stand",
        price: 39.99,
        quantity: 75,
        status: "available"
    }
];

module.exports = {

    searchProduct(searchbar) {
        try {
            const results = Inventory.filter(product => product.name.toLowerCase().includes(searchbar.toLowerCase()));
            if (results.length > 0) {
                return { found: true, results: results };
            } else {
                return { found: false, message: `No products found matching: ${searchbar}` };
            }
        } catch (e) {
            throw new Error(`Error: ${e.message}`);
        }
    },

    toggleproductstatus(productname, status) {
        try {
            const result = Inventory.find(product => product.name.toLowerCase() === productname.toLowerCase());

            if (!result) {
                throw new Error(`Product not found: ${productname}`);
            } else {
                if (status.toLowerCase() === "on") {
                    result.status = "available";
                } else if (status.toLowerCase() === "off") {
                    result.status = "not available";
                } else {
                    throw new Error(`Invalid status: ${status}. Use "on" or "off".`);
                }
                return `Product status updated: ${productname} is now ${result.status}`;
            }
        } catch (e) {
            throw new Error(`Error toggling product status: ${e.message}`);
        }
    },

    addnewproduct(name, description, price, quantity) {
        const newProduct = {
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            status: quantity > 0 ? "available" : "not available"
        };

        try {
            const existing = Inventory.find(product => product.name.toLowerCase() === name.toLowerCase());
            if (existing) {
                throw new Error(`Product already exists: ${name}`);
            }
            Inventory.push(newProduct);
            return "new product added: " + name;
        } catch (e) {
            throw new Error(`Error adding product: ${e.message}`);
        }
    },

    lowstockalert(int) {
        try {
            const lowStockProducts = Inventory.filter(product => product.quantity < int);
            if (lowStockProducts.length > 0) {
                return { found: true, products: lowStockProducts };
            } else {
                return { found: false, message: `No products with stock below ${int}` };
            }
        } catch (e) {
            throw new Error(`Error: ${e.message}`);
        }
    },

    deleteproductbyname(productname) {
        try {
            const index = Inventory.findIndex(product => product.name.toLowerCase() === productname.toLowerCase());
            if (index === -1) {
                throw new Error(`Product not found: ${productname}`);
            } else {
                Inventory.splice(index, 1);
                return `Product deleted: ${productname}`;
            }
        } catch (e) {
            throw new Error(`Error deleting product: ${e.message}`);
        }
    }
};

console.log('--- adding new products ---')
console.log(module.exports.addnewproduct("Webcam", "1080p HD Webcam", ["Electronics"], 49.99, 50));
console.log(module.exports.searchProduct("Webcam"));

console.log('--- Toggled Mechanical Keyboard status to off ---');
console.log(module.exports.toggleproductstatus("Mechanical Keyboard", "off"));
console.log(module.exports.searchProduct("Mechanical Keyboard"));
console.log('--- Toggled Mechanical Keyboard status to on ---');
console.log(module.exports.toggleproductstatus("Mechanical Keyboard", "on"));
console.log(module.exports.searchProduct("Mechanical Keyboard"));


console.log('--- Testing low stock alert for threshold 50 ---');
console.log(module.exports.lowstockalert(50));

console.log('--- Searching USB-C Cable to delete ( test ) ---');
console.log(module.exports.searchProduct("USB-C Cable"));
console.log('--- Deleting USB-C Cable ---');
console.log(module.exports.deleteproductbyname("USB-C Cable"));
console.log('--- Searching USB-C Cable after deletion ---');
console.log(module.exports.searchProduct("USB-C Cable"));

console.log('--- Searching for products with USB ---');
console.log(module.exports.searchProduct("USB"));


