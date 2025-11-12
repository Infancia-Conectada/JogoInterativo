/**
 * Middleware para inicializar o progresso da sessão do usuário
 * Estrutura: req.session.progress = { nivel1: 0, nivel2: 0, ... }
 */
export function initializeSessionProgress(req, res, next) {
  if (!req.session.progress) {
    req.session.progress = {};
  }
  next();
}

/**
 * Helper para resetar o progresso de um nível específico
 */
export function resetNivelProgress(req, nivel) {
  if (req.session.progress) {
    req.session.progress[nivel] = 0;
  }
}

/**
 * Helper para incrementar o progresso de um nível
 */
export function incrementNivelProgress(req, nivel) {
  if (!req.session.progress) {
    req.session.progress = {};
  }
  if (!req.session.progress[nivel]) {
    req.session.progress[nivel] = 0;
  }
  req.session.progress[nivel]++;
  return req.session.progress[nivel];
}

export default {
  initializeSessionProgress,
  resetNivelProgress,
  incrementNivelProgress
};