/**
 * Controller para página de introdução de cada nível
 */

import * as conteudoIntroModel from '../models/conteudoIntroModel.js';

// Renderiza a intro de um nível específico pela ordem
export async function renderIntro(req, res) {
  try {
    const ordem = parseInt(req.params.ordem);
    
    if (isNaN(ordem) || ordem < 1) {
      return res.redirect('/inicio');
    }

    // Busca o conteúdo da intro pela ordem
    const conteudo = await conteudoIntroModel.getConteudoIntroPorOrdem(ordem);
    
    if (!conteudo) {
      return res.status(404).render('404', { 
        title: 'Página não encontrada',
        message: 'Esta introdução não existe.'
      });
    }

    // Busca todas as intros para navegação
    const todasIntros = await conteudoIntroModel.getConteudoIntro();
    
    // Calcula se há próxima/anterior
    const temAnterior = ordem > 1;
    const temProxima = ordem < todasIntros.length;
    
    res.render('intro', { 
      conteudo,
      ordem,
      temAnterior,
      temProxima,
      totalIntros: todasIntros.length
    });
  } catch (error) {
    console.error('Erro ao renderizar intro:', error);
    res.status(500).send('Erro ao carregar introdução');
  }
}

export default {
  renderIntro
};