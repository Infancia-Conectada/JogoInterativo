# 🧪 GUIA DE TESTE - SISTEMA DE ERROS DO QUIZ

## Como Testar o Novo Sistema de Erro

### 🎯 Teste 1: Primeira Tentativa Errada
**Passos:**
1. Acesse um quiz qualquer (ex: `/quiz/7`)
2. Selecione uma resposta INCORRETA
3. Clique no botão "PRÓXIMA PÁGINA"

**Resultado Esperado:**
- ✅ Modal vermelho aparece com: "❌ Eita! Você errou pela segunda vez!" 
- ✅ A tela TREMENDO por 500ms
- ✅ Mensagem fica visível por ~2.5 segundos
- ✅ Após timeout, página recarrega com `/quiz/7?erro=1`
- ✅ Mensagem de erro "❌ Eita! Você errou!" aparece no topo
- ✅ Texto "Você só tem mais uma chance! Se errar acabou!" fica visível
- ✅ Botão "PRÓXIMA PÁGINA" fica disponível para nova tentativa

### 🎯 Teste 2: Segunda Tentativa Errada
**Passos:**
1. Na página com erro exibido, selecione OUTRA resposta incorreta
2. Clique no botão "PRÓXIMA PÁGINA"

**Resultado Esperado:**
- ✅ Modal vermelho aparece com: "Você errou pela segunda vez! Voltando para o início..."
- ✅ A tela TREMENDO por 500ms
- ✅ Mensagem fica visível por ~2.5 segundos
- ✅ Após timeout, redireciona para `/inicio`
- ✅ Progresso do nível RESETA (volta para 0)

### 🎯 Teste 3: Resposta Correta
**Passos:**
1. Acesse um quiz qualquer (ex: `/quiz/8`)
2. Selecione a resposta CORRETA
3. Clique no botão "PRÓXIMA PÁGINA"

**Resultado Esperado:**
- ✅ Caixa de resposta fica com borda azul
- ✅ Checkmark (✓) verde aparece com animação
- ✅ Confete (partículas) caem na tela
- ✅ Após 1 segundo, avança para próxima página
- ✅ Progresso do nível AUMENTA em 1

### 🎯 Teste 4: Botão "Página Anterior"
**Passos:**
1. Em um quiz qualquer, clique em "PÁGINA ANTERIOR"

**Resultado Esperado:**
- ✅ Quiz 7 → vai para `/pagina/6` (CORRETO)
- ✅ Quiz 16 → vai para `/pagina/15` (CORRETO)
- ✅ Quiz 25 → vai para `/pagina/24` (CORRETO)
- ✅ Quiz 8, 9, 17, 18, 26, 27 → volta pro quiz anterior

## 📊 Matriz de Testes Recomendados

| Quiz | Status Teste | Resultado |
|------|-------------|-----------|
| 7 | Erro 1x | ✓ Tremor + Modal |
| 7 | Erro 2x | ✓ Volta /inicio |
| 8 | Correto | ✓ Confete + Avanço |
| 16 | Erro 1x | ✓ Tremor + Modal |
| 16 | Erro 2x | ✓ Volta /inicio |
| 25 | Erro 1x | ✓ Tremor + Modal |
| 25 | Erro 2x | ✓ Volta /inicio |

## 🎨 Elementos Visuais Esperados

### Modal de Erro (Primeira Tentativa)
```
┌─────────────────────────────┐
│     ❌ Eita!                │
│                             │
│ Você só tem mais uma        │
│ chance! Se errar acabou!    │
└─────────────────────────────┘
(Fundo: gradiente vermelho)
```

### Modal de Erro (Segunda Tentativa)
```
┌─────────────────────────────┐
│     ❌ Eita!                │
│                             │
│ Você errou pela segunda     │
│ vez! Voltando para o início…│
│                             │
│ (Você será redirecionado)   │
└─────────────────────────────┘
(Fundo: gradiente vermelho)
```

### Animação de Tremor
- Movimento horizontal: -15px → +15px
- 9 passos de animação
- Duração: 500ms

## 💡 Comportamentos Principais

| Evento | Feedback | Ação | Tempo |
|--------|----------|------|-------|
| Erro 1ª vez | Modal + Tremor | Recarrega com ?erro=1 | 2.5s |
| Erro 2ª vez | Modal + Tremor | Vai para /inicio | 2.5s |
| Resposta correta | Checkmark + Confete | Avanço automático | 1s |
| Página carrega | Reset de seleção | Limpa UI anterior | Imediato |

## ✅ Checklist de Validação

- [ ] Primeira tentativa errada mostra mensagem
- [ ] Segunda tentativa errada mostra mensagem diferente
- [ ] Tremor visual ocorre em ambas as tentativas
- [ ] Tempo é suficiente para ler mensagem (2.5s)
- [ ] Rotas estão corretas (quiz 7, 16, 25)
- [ ] Botão "Próximo" fica habilitado após erro
- [ ] Confete continua funcionando em respostas corretas
- [ ] Progresso reseta ao voltar para /inicio
- [ ] Sem erros de console ao fazer testes
