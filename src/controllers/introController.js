/**
 * Controller para página de introdução de cada nível
 * Agora usa a tabela unificada 'paginas'
 */

import * as paginasModel from '../models/paginasModel.js';

// Renderiza a intro de um ordem específica
export async function renderIntro(req, res) {
  try {
    const ordem = parseInt(req.params.ordem);
    
    if (isNaN(ordem) || ordem < 1 || ordem > 27) {
      return res.redirect('/inicio');
    }

    // Busca a página pela ordem
    const pagina = await paginasModel.getPaginaPorOrdem(ordem);
    
    if (!pagina || pagina.tipo !== 'intro') {
      return res.status(404).render('404', { 
        title: 'Página não encontrada',
        message: 'Esta introdução não existe.'
      });
    }

    // Busca a próxima e página anterior para navegação
    const proximaPagina = await paginasModel.getProximaPagina(ordem);
    const paginaAnterior = await paginasModel.getPaginaAnterior(ordem);
    
    // Calcula se há próxima/anterior
    const temAnterior = paginaAnterior !== null;
    const temProxima = proximaPagina !== null;
    
    res.render('intro', { 
      conteudo: pagina,
      ordem,
      temAnterior,
      temProxima,
      totalPaginas: 27
    });
  } catch (error) {
    console.error('Erro ao renderizar intro:', error);
    res.status(500).send('Erro ao carregar introdução');
  }
}

export default {
  renderIntro
};