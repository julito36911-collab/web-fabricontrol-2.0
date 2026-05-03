require('dotenv').config();
const fs = require('fs');

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey.trim()}`;

async function listAllModels() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        fs.writeFileSync('C:\\web-fabricontrol-2.0\\frontend\\models.json', JSON.stringify(data.models.map(m=>m.name), null, 2));
        console.log("Written to models.json!!");
    } catch (e) {
        console.error("Fetch Error:", e.message);
    }
}

listAllModels();
