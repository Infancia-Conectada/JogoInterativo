/**
 * Controller para páginas de explicação
 * Agora usa a tabela unificada 'paginas'
 * Sempre renderiza explicacao.ejs (não importa se é tipo 1 ou 2)
 * A view detecta automaticamente e formata como passos se for nível 2+
 */

import * as paginasModel from '../models/paginasModel.js';

// Renderiza explicação específica pela ordem
export async function renderExplicacao(req, res) {
  try {
    const ordem = parseInt(req.params.ordem);
    
    if (isNaN(ordem) || ordem < 1 || ordem > 27) {
      return res.redirect('/inicio');
    }

    // Busca a página pela ordem
    const pagina = await paginasModel.getPaginaPorOrdem(ordem);
    
    if (!pagina || (pagina.tipo !== 'explicacao_1' && pagina.tipo !== 'explicacao_2')) {
      return res.status(404).render('404', { 
        title: 'Página não encontrada',
        message: 'Esta explicação não existe.'
      });
    }

    // Busca a próxima e página anterior para navegação
    const proximaPagina = await paginasModel.getProximaPagina(ordem);
    const paginaAnterior = await paginasModel.getPaginaAnterior(ordem);
    
    // Calcula se há próxima/anterior
    const temAnterior = paginaAnterior !== null;
    const temProxima = proximaPagina !== null;
    
    // Sempre usa explicacao.ejs - a view detecta o nível e formata
    console.log(`[DEBUG] Renderizando página ${ordem}, tipo: ${pagina.tipo}`);
    
    // Força sempre usar 'explicacao' e nunca 'explicacao2'
    const viewName = 'explicacao';
    console.log(`[DEBUG] View a renderizar: ${viewName}`);
    
    res.render(viewName, { 
      conteudo: pagina,
      ordem,
      tipo: pagina.tipo,
      temAnterior,
      temProxima,
      totalPaginas: 27
    });
  } catch (error) {
    console.error('Erro ao renderizar explicação:', error);
    res.status(500).send('Erro ao carregar explicação');
  }
}

export default {
  renderExplicacao
};