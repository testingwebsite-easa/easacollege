
// ==================== ALUMNI REGISTRATION ENDPOINTS ====================

app.post('/api/alumni', (req, res) => {
    const uploadPhoto = uploadS3.single('photo');

    uploadPhoto(req, res, async (err) => {
        if (err) {
            console.error("Upload Error in Alumni Registration:", err);
            return res.status(400).json({ success: false, message: "File Upload Failed: " + err.message });
        }

        if (!isConnected) return res.status(503).json({ error: "Database not connected" });

        try {
            let alumniData;
            // Handle multipart/form-data where 'data' is a JSON string (similar to job apps pattern if used) or just fields
            if (req.body.data) {
                try {
                    alumniData = JSON.parse(req.body.data);
                } catch (e) {
                    return res.status(400).json({ success: false, message: "Invalid JSON data provided" });
                }
            } else {
                alumniData = req.body;
            }

            if (req.file) {
                alumniData.photoUrl = req.file.location;
            }

            const alumni = new Alumni(alumniData);
            await alumni.save();
            res.status(201).json({ success: true, message: "Registration successful", alumni });
        } catch (err) {
            console.error("Alumni Registration Error:", err);
            res.status(500).json({ success: false, message: "Failed to register: " + err.message });
        }
    });
});

app.get('/api/alumni', async (req, res) => {
    if (!isConnected) return res.json([]);
    try {
        const alumni = await Alumni.find().sort({ registeredAt: -1 });
        res.json(alumni);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch alumni" });
    }
});

app.put('/api/alumni/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const alumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(alumni);
    } catch (err) {
        res.status(500).json({ error: "Failed to update alumni" });
    }
});

app.delete('/api/alumni/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await Alumni.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete alumni" });
    }
});

