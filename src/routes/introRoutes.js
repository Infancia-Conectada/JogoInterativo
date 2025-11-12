import express from 'express';
import { renderIntro } from '../controllers/introcontroller.js';

const router = express.Router();

// Rota para intro de cada ordem (ex: /intro/1, /intro/2, etc)
router.get('/:ordem', renderIntro);

export default router;