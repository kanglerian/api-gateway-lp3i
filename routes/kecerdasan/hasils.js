const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter('http://103.163.111.39:8001/hasils');

router.get('/', async (req, res) => {
    try {
        const response = await api.get('/');
        const results = response.data;

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Hasil Kecerdasan');

        sheet.addRow(['No.','Sekolah', 'Kelas', 'Nama Lengkap', 'No. Telpon', 'Kecerdasan']);

        results.forEach((result, index) => {
            sheet.addRow([
                index + 1,
                `${result.school}`,
                `${result.classes}`,
                `${result.name_user}`,
                `${result.phone}`,
                result.jenis_kecerdasan
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
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
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
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

module.exports = router;