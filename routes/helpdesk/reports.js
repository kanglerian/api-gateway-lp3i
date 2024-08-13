const express = require('express');
const router = express.Router();
const ExcelJS = require('exceljs');
const { Message } = require('../../models');

/* GET report listing. */
router.get('/download', async (req, res) => {
  try {
      const results = await Message.findAll();

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Laporan Helpdesk');

      sheet.addRow(['No.','Ruangan', 'Keluhan', 'Tanggal']);

      results.forEach((result, index) => {
          sheet.addRow([
              index + 1,
              `${result.room}`,
              `${result.message}`,
              `${result.createdAt}`,
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

module.exports = router;
