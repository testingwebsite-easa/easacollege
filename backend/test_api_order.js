const http = require('http');

const url = 'http://localhost:5000/api/departments';

http.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const depts = JSON.parse(data);
            console.log("Departments fetched successfully:");
            if (Array.isArray(depts)) {
                depts.forEach(d => {
                    console.log(`- ${d.name} (Order: ${d.order || 'undefined'})`);
                });
            } else {
                console.log("Response is not an array:", data);
            }
        } catch (e) {
            console.error("Error parsing JSON:", e);
        }
    });
}).on('error', err => {
    console.error("Error fetching:", err.message);
});
