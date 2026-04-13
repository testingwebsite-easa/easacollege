
// ==================== ADMISSIONS ROUTES ====================
app.get('/api/admissions', async (req, res) => {
    try {
        const admissions = await Admission.find().sort({ order: 1 });
        res.json(admissions);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch admissions" });
    }
});

app.post('/api/admissions', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = new Admission(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to create admission item" });
    }
});

app.put('/api/admissions/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const item = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: "Failed to update admission item" });
    }
});

app.delete('/api/admissions/:id', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        await Admission.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete admission item" });
    }
});

// ==================== POPUP ALERT ROUTES ====================
app.get('/api/popup-alert', async (req, res) => {
    try {
        const alert = await PopupAlert.findOne();
        res.json(alert || null);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch popup alert" });
    }
});

app.post('/api/popup-alert', async (req, res) => {
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        // Upsert logic: only one popup alert should exist active? No, usually one doc.
        // Or if we treat it as singleton.
        // Let's assume singleton for simplicity as per dashboard usage.
        const alert = await PopupAlert.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(alert);
    } catch (err) {
        res.status(500).json({ error: "Failed to save popup alert" });
    }
});

app.put('/api/popup-alert/:id', async (req, res) => {
    // If ID is provided, update specifically.
    if (!isConnected) return res.status(503).json({ error: "Database not connected" });
    try {
        const alert = await PopupAlert.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(alert);
    } catch (err) {
        res.status(500).json({ error: "Failed to update popup alert" });
    }
});
