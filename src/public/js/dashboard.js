// Variáveis globais
let folderCount = 0;
let isAnimating = false;




// Mensagens motivacionais para as crianças
const successMessages = [
    "🎉 Parabéns! Você criou uma nova pasta!",
    "✨ Muito bem! Sua pasta foi criada com sucesso!",
    "🌟 Excelente! Agora você sabe criar pastas!",
    "🎯 Perfeito! Você está aprendendo rápido!",
    "🚀 Incrível! Mais uma pasta organizada!"
];

// Nomes aleatórios para as pastas criadas
const folderNames = [
    "Minha Nova Pasta",
    "Fotos Divertidas",
    "Jogos Favoritos",
    "Desenhos Legais",
    "Músicas Bacanas",
    "Vídeos Engraçados",
    "Trabalhos da Escola",
    "Histórias Fantásticas"
];



// Função para inicializar os eventos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    addInteractiveEffects();
});

// Configurar todos os event listeners
function initializeEventListeners() {
    const createBtn = document.getElementById('createFolderBtn');
    const stepItems = document.querySelectorAll('.step-item');
    
    if (createBtn) {
        createBtn.addEventListener('click', simulateCreateFolder);
    }
    
    // Adicionar efeitos interativos aos passos
    stepItems.forEach((step, index) => {
        step.addEventListener('click', () => highlightStep(step, index));
        step.addEventListener('mouseenter', () => animateStep(step, 'enter'));
        step.addEventListener('mouseleave', () => animateStep(step, 'leave'));
    });
}

// Função principal para simular a criação de pasta
function simulateCreateFolder() {
    if (isAnimating) return;
    
    isAnimating = true;
    const folderContainer = document.getElementById('folderContainer');
    const resultDiv = document.getElementById('demoResult');
    const btn = document.getElementById('createFolderBtn');
    
    // Desabilitar botão temporariamente
    btn.disabled = true;
    btn.textContent = '⏳ Criando pasta...';
    
    // Simular processo de criação com delay
    setTimeout(() => {
        createNewFolder(folderContainer);
        showSuccessMessage(resultDiv);
        
        // Reabilitar botão
        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = '🎯 Criar Nova Pasta';
            isAnimating = false;
        }, 1500);
        
    }, 1000);
}

// Criar nova pasta visual
function createNewFolder(container) {
    folderCount++;
    
    // Remover pasta antiga se houver muitas
    const folders = container.querySelectorAll('.folder-icon');
    if (folders.length >= 6) {
        const firstFolder = folders[0];
        firstFolder.style.opacity = '0';
        firstFolder.style.transform = 'scale(0.5)';
        setTimeout(() => firstFolder.remove(), 300);
    }
    
    // Criar nova pasta
    const newFolder = document.createElement('div');
    newFolder.className = 'folder-icon created';
    newFolder.style.opacity = '0';
    newFolder.style.transform = 'scale(0.5)';
    
    // Adicionar tooltip com nome da pasta
    const folderName = folderNames[Math.floor(Math.random() * folderNames.length)];
    newFolder.title = folderName;
    
    container.appendChild(newFolder);
    
    // Animar entrada
    setTimeout(() => {
        newFolder.style.opacity = '1';
        newFolder.style.transform = 'scale(1)';
    }, 100);
    
    // Efeito especial após criação
    setTimeout(() => {
        addSparkleEffect(newFolder);
    }, 500);
}

// Mostrar mensagem de sucesso
function showSuccessMessage(resultDiv) {
    const message = successMessages[Math.floor(Math.random() * successMessages.length)];
    
    resultDiv.textContent = message;
    resultDiv.className = 'demo-result success show';
    
    // Ocultar mensagem após alguns segundos
    setTimeout(() => {
        resultDiv.className = 'demo-result';
    }, 3000);
}

// Destacar passo quando clicado
function highlightStep(step, index) {
    // Remover destaque de outros passos
    document.querySelectorAll('.step-item').forEach(item => {
        item.classList.remove('highlighted');
    });
    
    // Adicionar destaque ao passo atual
    step.classList.add('highlighted');
    
    // Adicionar estilo CSS temporário se não existir
    if (!document.getElementById('highlight-style')) {
        const style = document.createElement('style');
        style.id = 'highlight-style';
        style.textContent = `
            .step-item.highlighted {
                background: rgba(108, 99, 255, 0.3) !important;
                border-color: rgba(108, 99, 255, 0.6) !important;
                transform: translateX(10px) scale(1.02) !important;
                box-shadow: 0 8px 25px rgba(108, 99, 255, 0.4) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remover destaque após alguns segundos
    setTimeout(() => {
        step.classList.remove('highlighted');
    }, 2000);
    
    // Mostrar dica específica do passo
    showStepTip(index);
}

// Animações dos passos no hover
function animateStep(step, action) {
    if (action === 'enter') {
        step.style.transform = 'translateX(8px) scale(1.01)';
        step.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
    } else {
        step.style.transform = '';
        step.style.boxShadow = '';
    }
}

// Mostrar dicas específicas para cada passo
function showStepTip(stepIndex) {
    const tips = [
        "💡 Clique em qualquer lugar vazio da tela!",
        "🔍 Procure no menu que apareceu!",
        "👆 Um clique simples é suficiente!",
        "⌨️ Use um nome fácil de lembrar!",
        "✅ Enter confirma sua escolha!"
    ];
    
    const resultDiv = document.getElementById('demoResult');
    resultDiv.textContent = tips[stepIndex] || "🌟 Muito bem!";
    resultDiv.className = 'demo-result show';
    
    setTimeout(() => {
        resultDiv.className = 'demo-result';
    }, 2500);
}

// Efeito de brilho nas pastas
function addSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '🌟', '💫'];
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('span');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = '20px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            
            // Posição aleatória ao redor da pasta
            const rect = element.getBoundingClientRect();
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(sparkle);
            
            // Animar e remover
            sparkle.animate([
                { opacity: 1, transform: 'scale(0.5) translateY(0)' },
                { opacity: 0, transform: 'scale(1) translateY(-30px)' }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => sparkle.remove();
            
        }, i * 200);
    }
}

// Adicionar efeitos interativos extras
function addInteractiveEffects() {
    // Efeito parallax suave no fundo
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const containers = document.querySelectorAll('.content-section, .visual-section');
        containers.forEach(container => {
            const speed = 5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            container.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Efeito de flutuação nas pastas
    setInterval(() => {
        const folders = document.querySelectorAll('.folder-icon');
        folders.forEach((folder, index) => {
            if (!folder.classList.contains('created')) {
                const delay = index * 200;
                setTimeout(() => {
                    folder.style.transform += ' translateY(-2px)';
                    setTimeout(() => {
                        folder.style.transform = folder.style.transform.replace(' translateY(-2px)', '');
                    }, 300);
                }, delay);
            }
        });
    }, 3000);
}

// Função para resetar a demonstração
function resetDemo() {
    folderCount = 0;
    const folderContainer = document.getElementById('folderContainer');
    const resultDiv = document.getElementById('demoResult');
    
    // Remover todas as pastas criadas
    const createdFolders = folderContainer.querySelectorAll('.folder-icon.created');
    createdFolders.forEach(folder => folder.remove());
    
    // Limpar mensagem
    resultDiv.className = 'demo-result';
    resultDiv.textContent = '';
}

// Adicionar botão de reset (se necessário)
if (folderCount > 5) {
    setTimeout(resetDemo, 10000); // Reset automático após 10 segundos
}