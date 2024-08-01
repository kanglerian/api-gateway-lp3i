require('dotenv').config();
const { SERVICE_BRAIN } = process.env;
const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter(`${SERVICE_BRAIN}/hasils`);

router.get('/', async (req, res) => {
    try {
        const response = await api.get('/');
        const results = response.data;

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Hasil Tes Otak');

        sheet.addRow(['No.', 'Nama Lengkap', 'No HP', 'Sekolah', 'Score Kanan', 'Score Kiri', 'Hasil']);

        results.forEach((result, index) => {
            sheet.addRow([
                index + 1,
                `${result.name}`,
                `${result.phone}`,
                `${result.school}`,
                `${result.kanan}`,
                `${result.kiri}`,
                result.hasil
            ]);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="example.xlsx"');

        const buffer = await workbook.xlsx.writeBuffer();
        res.send(buffer);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await api.get(`/${req.params.id}`);
        return res.json(response.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        return res.status(500).json({ error: "an error occurred on the server" });
    }
});

module.exports = router;