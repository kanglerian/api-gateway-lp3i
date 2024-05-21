const express = require('express');
const router = express.Router();
const ExcelJS = require('exceljs');
const moment = require('moment-timezone');
const { Op } = require('sequelize');
const { Message } = require('../models')

router.get('/', function (req, res, next) {
    res.send('Help Desk LP3I 🇮🇩');
});

router.get('/report', async (req, res) => {
    try {
        let where = {};
        const room = req.query.room;
        const start = req.query.start;
        const from = req.query.from;

        if (room && room !== 'all') {
            where.room = room;
        }

        if (start && from && start !== 'all' && from !== 'all') {
            where.createdAt = { [Op.between]: [start, from] };
        }

        const count = await Message.count({ where });
        const results = await Message.findAll({ where });

        return res.json({
            count: count,
            data: results
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});

router.get('/report/download', async (req, res) => {
    try {
        const results = await Message.findAll();

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Laporan Helpdesk');

        sheet.addRow(['No.','Ruangan', 'Keluhan', 'Tanggal']);

        results.forEach((result, index) => {
            const time = moment(result.createdAt).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            sheet.addRow([
                index + 1,
                `${result.room}`,
                `${result.message}`,
                `${time}`,
            ]);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="laporan-helpdesk.xlsx"');

        const buffer = await workbook.xlsx.writeBuffer();
        res.send(buffer);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});

router.get('/report/:room', async (req, res) => {
    try {
        const report = await Message.findAll({
            where: {
                room: req.params.room
            }
        });
        return res.json(report);
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});

router.delete('/report/:start/:from', async (req, res) => {
    try {
        const start = req.params.start;
        const from = req.params.from;
        await Message.destroy({
            where: {
                createdAt: { [Op.between]: [start, from] }
            }
        });
        return res.json({
            message: 'Berhasil dihapus!'
        });
    } catch (error) {
        console.log(error);
        return res.json(error);
    }
});

module.exports = router;
