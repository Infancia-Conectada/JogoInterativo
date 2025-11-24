/**
 * Controller para página de parabéns após completar um nível
 */

// Renderiza página de parabéns
export function renderParabens(req, res) {
  try {
    const ordem = parseInt(req.query.ordem);
    
    if (isNaN(ordem) || ordem < 1) {
      return res.redirect('/inicio');
    }

    // Determina se é o último nível (3 intros/explicações)
    const totalIntros = 3;
    const isFinal = ordem >= totalIntros;

    // Renderiza view apropriada
    const viewName = isFinal ? 'parabensFinal' : 'parabens';
    
    res.render(viewName, { 
      ordem,
      proximaOrdem: ordem + 1,
      isFinal
    });

  } catch (error) {
    console.error('Erro ao renderizar parabéns:', error);
    res.status(500).send('Erro ao carregar página de parabéns');
  }
}

// Avança para próximo nível
export function avancarNivel(req, res) {
  try {
    const ordemAtual = parseInt(req.params.ordem);
    const proximaOrdem = ordemAtual + 1;
    
    // Redireciona para intro da próxima ordem
    res.redirect(`/intro/${proximaOrdem}`);
    
  } catch (error) {
    console.error('Erro ao avançar nível:', error);
    res.redirect('/inicio');
  }
}

// Renderiza página de certificado
export function renderCertificado(req, res) {
  try {
    // Pega data e hora do sistema
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    
    const data = `${dia}/${mes}/${ano}`;
    const hora = `${horas}:${minutos}`;
    
    console.log(`[DEBUG] Renderizando certificado com data: ${data}, hora: ${hora}`);
    
    res.render('certificado', { 
      data,
      hora
    });
    
  } catch (error) {
    console.error('Erro ao renderizar certificado:', error);
    res.status(500).send('Erro ao carregar certificado');
  }
}

export default {
  renderParabens,
  avancarNivel,
  renderCertificado
};