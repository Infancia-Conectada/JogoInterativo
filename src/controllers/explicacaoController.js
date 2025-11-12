/**
 * Controller para páginas de explicação
 * Renderiza explicações 1 ou 2 baseado na ordem
 */

import * as explicacao1Model from '../models/explicacao1Model.js';
import * as explicacao2Model from '../models/explicacao2Model.js';
import * as conteudoIntroModel from '../models/conteudoIntroModel.js';

// Renderiza explicação específica pela ordem
export async function renderExplicacao(req, res) {
  try {
    const ordem = parseInt(req.params.ordem);
    const tipo = req.params.tipo || '1'; // '1' ou '2'
    
    if (isNaN(ordem) || ordem < 1) {
      return res.redirect('/inicio');
    }

    let conteudo;
    let todasExplicacoes;
    
    // Busca o tipo correto de explicação
    if (tipo === '2') {
      conteudo = await explicacao2Model.getExplicacao2PorOrdem(ordem);
      todasExplicacoes = await explicacao2Model.getExplicacao2();
    } else {
      conteudo = await explicacao1Model.getExplicacao1PorOrdem(ordem);
      todasExplicacoes = await explicacao1Model.getExplicacao1();
    }
    
    if (!conteudo) {
      return res.status(404).render('404', { 
        title: 'Página não encontrada',
        message: 'Esta explicação não existe.'
      });
    }

    // Busca a imagem correspondente da intro (pela ordem)
    const conteudoIntro = await conteudoIntroModel.getConteudoIntroPorOrdem(ordem);
    const imagemIntro = conteudoIntro ? conteudoIntro.imagem : null;

    // Calcula se há próxima/anterior
    const temAnterior = ordem > 1;
    const temProxima = ordem < todasExplicacoes.length;
    
    // Define qual view usar
    const viewName = tipo === '2' ? 'explicacao2' : 'explicacao';
    
    res.render(viewName, { 
      conteudo,
      imagemIntro,
      ordem,
      tipo,
      temAnterior,
      temProxima,
      totalExplicacoes: todasExplicacoes.length
    });
  } catch (error) {
    console.error('Erro ao renderizar explicação:', error);
    res.status(500).send('Erro ao carregar explicação');
  }
}

export default {
  renderExplicacao
};