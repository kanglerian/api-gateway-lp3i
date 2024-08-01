require('dotenv').config();
const { SERVICE_GAYABELAJAR } = process.env;
const express = require('express');
const ExcelJS = require('exceljs');
const router = express.Router();
const apiAdapter = require('../apiAdapter');

const api = apiAdapter(`${SERVICE_GAYABELAJAR}/hasils`);

router.get('/', async (req, res) => {
    try {
        const response = await api.get('/');
        const results = response.data;

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Hasil Kecerdasan');

        sheet.addRow(['No.', 'Nama Lengkap', 'Kelas', 'Sekolah', 'Score A', 'Score B', 'Score C', 'Hasil']);

        results.forEach((result, index) => {
            sheet.addRow([
                index + 1,
                `${result.nama}`,
                `${result.kelas}`,
                `${result.sekolah}`,
                `${result.score_A}`,
                `${result.score_B}`,
                `${result.score_C}`,
                `${result.hasil}`,
            ]);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="example.xlsx"');

        const buffer = await workbook.xlsx.writeBuffer();
        res.send(buffer);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        } else {
            const response = error.response;
            return res.status(response.status).json(response.data);
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await api.get(`/${req.params.id}`);
        return res.json(response.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        } else {
            const response = error.response;
            return res.status(response.status).json(response.data);
        }
    }
});

module.exports = router;