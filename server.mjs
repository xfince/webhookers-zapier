import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const port = 5500;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory

// Route to handle form submission
app.post('/submit', async (req, res) => {
    const formData = req.body;

    console.log('Form data received:', formData);

    try {
        const response = await fetch('https://hooks.zapier.com/hooks/catch/19446110/223k6y3/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        console.log('Zapier response:', data);
        res.json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error sending to Zapier:', error);
        res.status(500).json({ message: 'Error submitting form' });
    }
});

// Route to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html')); // Adjust the path as necessary
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
