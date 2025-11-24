import express from 'express';
import * as paginasModel from '../models/paginasModel.js';

const router = express.Router();

/**
 * Rota genérica para navegar diretamente por página
 * Ex: /pagina/1 → carrega a página 1 (intro)
 * Ex: /pagina/7 → carrega a página 7 (quiz)
 * 
 * Isso permite navegação dinâmica na sequência de 27 páginas
 */
router.get('/:ordem', async (req, res) => {
  try {
    const ordem = parseInt(req.params.ordem);
    
    if (isNaN(ordem) || ordem < 1 || ordem > 27) {
      return res.redirect('/inicio');
    }

    // Busca a página pela ordem
    const pagina = await paginasModel.getPaginaPorOrdem(ordem);
    
    if (!pagina) {
      return res.status(404).render('404', { 
        title: 'Página não encontrada',
        message: 'Esta página não existe.'
      });
    }

    // Redireciona para a rota específica baseado no tipo
    switch (pagina.tipo) {
      case 'intro':
        return res.redirect(`/intro/${ordem}`);
      case 'explicacao_1':
      case 'explicacao_2':
        return res.redirect(`/explicacao/${ordem}`);
      case 'quiz':
        return res.redirect(`/quiz/${ordem}`);
      default:
        return res.redirect('/inicio');
    }

  } catch (error) {
    console.error('Erro ao navegar para página:', error);
    res.status(500).send('Erro ao carregar página');
  }
});

export default router;
