import app from './backend/index.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Production Server running on port ${PORT}`);
});
