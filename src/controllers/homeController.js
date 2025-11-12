/**
 * Controller para páginas iniciais (home e introdução)
 */

// Renderiza a página inicial do jogo
export function renderInicio(req, res) {
  try {
    res.render('inicio');
  } catch (error) {
    console.error('Erro ao renderizar início:', error);
    res.status(500).send('Erro ao carregar página inicial');
  }
}

// Renderiza a página de introdução geral
export function renderIntroducao(req, res) {
  try {
    res.render('introducao');
  } catch (error) {
    console.error('Erro ao renderizar introdução:', error);
    res.status(500).send('Erro ao carregar introdução');
  }
}

// Redireciona para o primeiro nível
export function iniciarJogo(req, res) {
  // Reseta o progresso ao iniciar novo jogo
  req.session.progress = {};
  res.redirect('/intro/1');
}

export default {
  renderInicio,
  renderIntroducao,
  iniciarJogo
};