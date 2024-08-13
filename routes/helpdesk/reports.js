const express = require('express');
const router = express.Router();
const ExcelJS = require('exceljs');
const { Chat } = require('../../models');

/* GET report listing. */
router.get('/', async (req, res) => {
  try {
      const results = await Chat.findAll({
        where: {
          token: '46150',
          role_sender: 'S'
        }
      });

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Laporan Helpdesk');

      sheet.addRow(['No.','Ruangan', 'Pesan', 'Tanggal']);

      results.forEach((result, index) => {
          sheet.addRow([
              index + 1,
              `${result.client}`,
              `${result.message}`,
              `${result.createdAt}`,
          ]);
      });

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="laporan-helpdesk.xlsx"');

      const buffer = await workbook.xlsx.writeBuffer();
      res.send(buffer);
  } catch (error) {
      return res.json(error);
  }
});

module.exports = router;
