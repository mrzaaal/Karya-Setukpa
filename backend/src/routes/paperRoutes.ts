import { Router } from 'express';
import {
    getAllPapers,
    getPaperById,
    createPaper,
    updatePaper,
    deletePaper,
    addComment,
    updateContentApproval,
    uploadFinalDocument,
    deleteFinalDocument,
    updateFinalApproval,
    gradePaper,
    verifyPaper,
    getPendingVerificationPapers,
} from '../controllers/paperController.js';
import { exportPaperToDocx } from '../controllers/paperExportController.js';
import { downloadChapterPDF } from '../controllers/pdfController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getAllPapers);
router.get('/pending-verification', getPendingVerificationPapers); // Must be before /:id
router.get('/:id', getPaperById);
router.get('/:id/export-docx', exportPaperToDocx);
router.get('/:id/chapter/:chapterIndex/pdf', downloadChapterPDF); // Download chapter as PDF
router.post('/', createPaper);
router.put('/:id', updatePaper);
router.delete('/:id', deletePaper);
router.post('/:id/comments', addComment);

router.put('/:id/content-approval', updateContentApproval);

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer
// Configure multer for memory storage (for Supabase upload)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, true);
        } else {
            cb(new Error('Only .pdf and .docx format allowed!'));
        }
    }
});

router.post('/:id/upload-final', upload.single('file'), uploadFinalDocument);
router.delete('/:id/final-upload', deleteFinalDocument);

router.put('/:id/final-approval', updateFinalApproval);
router.put('/:id/verify', verifyPaper); // Superadmin verification

router.post('/:id/grade', gradePaper);

export default router;
