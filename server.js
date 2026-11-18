const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Store product details
let products = [
    {
        id: 1,
        name: "Mouse",
        price: 500,
        category: "Electronics"
    },
    {
        id: 2,
        name: "Keyboard",
        price: 1000,
        category: "Electronics"
    }
];

// GET: Display all products
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// POST: Add a new product
app.post('/products', (req, res) => {
    const product = req.body;

    products.push(product);

    res.status(201).json({
        message: "Product added successfully",
        product: product
    });
});

// GET: Search product by ID
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (product) {
        res.status(200).json(product);
    }
    else {
        res.status(404).send("Product not found");
    }
});

// PUT: Update product by ID
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.category = req.body.category;

        res.status(200).json({
            message: "Product updated successfully",
            product: product
        });
    }
    else {
        res.status(404).send("Product not found");
    }
});

// DELETE: Delete product by ID
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (product) {
        products = products.filter(p => p.id !== id);

        res.status(200).send("Product deleted successfully");
    }
    else {
        res.status(404).send("Product not found");
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
