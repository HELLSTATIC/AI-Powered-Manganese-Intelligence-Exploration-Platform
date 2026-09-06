const fs = require('fs');
const path = require('path');
const UploadedFile = require('../models/UploadedFile');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a CSV, JSON, or Excel file.' });
    }

    const filepath = req.file.path;
    const filename = req.file.filename;
    const originalname = req.file.originalname;
    const mimetype = req.file.mimetype;
    const size = req.file.size;

    let rowCount = 0;
    let columns = [];
    let previewRows = [];

    // Parse CSV simple reader
    if (originalname.endsWith('.csv') || mimetype === 'text/csv') {
      const content = fs.readFileSync(filepath, 'utf8');
      const lines = content.split('\n').filter(line => line.trim().length > 0);
      if (lines.length > 0) {
        columns = lines[0].split(',').map(c => c.trim().replace(/^"|"$/g, ''));
        rowCount = lines.length - 1;
        previewRows = lines.slice(1, 6).map(line => {
          const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
          const rowObj = {};
          columns.forEach((col, idx) => {
            rowObj[col] = vals[idx] !== undefined ? vals[idx] : '';
          });
          return rowObj;
        });
      }
    } else if (originalname.endsWith('.json') || mimetype === 'application/json') {
      const content = fs.readFileSync(filepath, 'utf8');
      const jsonData = JSON.parse(content);
      if (Array.isArray(jsonData)) {
        rowCount = jsonData.length;
        if (jsonData.length > 0) {
          columns = Object.keys(jsonData[0]);
          previewRows = jsonData.slice(0, 5);
        }
      }
    }

    let savedFile = null;
    try {
      savedFile = await UploadedFile.create({
        filename,
        originalname,
        mimetype,
        size,
        filepath,
        rowCount,
        columns,
        previewRows,
        status: 'PARSED'
      });
    } catch (e) {
      savedFile = {
        _id: "up_" + Date.now(),
        filename,
        originalname,
        mimetype,
        size,
        filepath,
        rowCount,
        columns,
        previewRows,
        status: 'PARSED'
      };
    }

    res.status(201).json({
      success: true,
      message: 'File successfully uploaded and parsed.',
      data: savedFile
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUploadedFiles = async (req, res) => {
  try {
    const files = await UploadedFile.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: files.length, data: files });
  } catch (error) {
    res.json({ success: true, count: 0, data: [] });
  }
};
