const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const FormSubmission = require('./models/FormSubmission');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://Peedluk12345:Peedluk12345@cluster0.mmegimw.mongodb.net/test';

const cors = require('cors');
app.use(cors());


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))



    app.post('/submit-form', async (req, res) => {
        try {
            
            const { firstName, lastName, email, username, password, confirmPassword } = req.body;
            if (!firstName ||!lastName || !email || !username || !password || !confirmPassword) {
                return res.status(400).json({ message: 'All fields are required' });
            }
    
    
            const formSubmission = new FormSubmission({
                firstName,
                lastName,
                email,
                username,
                password,
                confirmPassword
            });
    
            
            await formSubmission.save();
    
        
            res.status(201).json({ message: 'Form submitted successfully!', data: formSubmission });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'An error occurred while submitting the form.' });
        }
    });


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
