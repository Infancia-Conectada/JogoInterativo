// Variáveis globais
let selectedAnswer = null;
let answered = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    setupNavigation();
});

function initializeQuiz() {
    const alternatives = document.querySelectorAll('.alternative-box');
    
    alternatives.forEach(alternative => {
        alternative.addEventListener('click', () => handleAnswerClick(alternative));
    });
}

function handleAnswerClick(clickedBox) {
    // Se já respondeu, não permite clicar novamente
    if (answered) return;
    
    const isCorrect = clickedBox.classList.contains('correct-answer');
    const allBoxes = document.querySelectorAll('.alternative-box');
    
    // Marca como respondido
    answered = true;
    
    if (isCorrect) {
        // Resposta correta
        clickedBox.classList.add('correct');
        showCorrectFeedback(clickedBox);
        launchConfetti();
        
        // Habilita o botão de próxima página após 1 segundo
        setTimeout(() => {
            document.getElementById('nextBtn').disabled = false;
            document.getElementById('nextBtn').style.opacity = '1';
            document.getElementById('nextBtn').style.cursor = 'pointer';
        }, 1000);
    } else {
        // Resposta incorreta
        clickedBox.classList.add('incorrect');
        shakeAnimation(clickedBox);
        
        // Após 1 segundo, mostra a resposta correta
        setTimeout(() => {
            const correctBox = document.querySelector('.correct-answer');
            correctBox.classList.add('reveal-correct');
            pulseAnimation(correctBox);
        }, 800);
    }
    
    // Desabilita cliques nas outras alternativas
    allBoxes.forEach(box => {
        if (box !== clickedBox) {
            box.style.pointerEvents = 'none';
            box.style.opacity = '0.6';
        }
    });
}

// Animação de tremor para resposta errada
function shakeAnimation(element) {
    element.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(0)' }
    ], {
        duration: 500,
        easing: 'ease-in-out'
    });
}

// Animação de pulso para resposta correta
function pulseAnimation(element) {
    element.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' },
        { transform: 'scale(1.05)' },
        { transform: 'scale(1)' }
    ], {
        duration: 1000,
        easing: 'ease-in-out'
    });
}

// Feedback visual para resposta correta
function showCorrectFeedback(element) {
    // Criar elemento de feedback
    const feedback = document.createElement('div');
    feedback.className = 'feedback-text';
    feedback.innerHTML = '✓ Correto!';
    feedback.style.position = 'absolute';
    feedback.style.top = '50%';
    feedback.style.left = '50%';
    feedback.style.transform = 'translate(-50%, -50%)';
    feedback.style.fontSize = '2em';
    feedback.style.fontWeight = 'bold';
    feedback.style.color = '#10B981';
    feedback.style.zIndex = '100';
    feedback.style.textShadow = '0 0 10px rgba(16, 185, 129, 0.5)';
    feedback.style.animation = 'fadeInOut 2s ease-in-out';
    
    element.style.position = 'relative';
    element.appendChild(feedback);
    
    // Remove o feedback após a animação
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

// Sistema de confetes
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const confettiCount = 150;
    const colors = ['#3B82F6', '#22D3EE', '#FACC15', '#10B981', '#F59E0B'];
    
    // Criar confetes
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    // Animar confetes
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((piece, index) => {
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            ctx.restore();
            
            // Atualizar posição
            piece.y += piece.speedY;
            piece.x += piece.speedX;
            piece.rotation += piece.rotationSpeed;
            
            // Remover confetes que saíram da tela
            if (piece.y > canvas.height) {
                confetti.splice(index, 1);
            }
        });
        
        if (confetti.length > 0) {
            requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animateConfetti();
}

// Navegação entre páginas
function setupNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Desabilita o botão próximo inicialmente
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
    nextBtn.style.cursor = 'not-allowed';
    
    prevBtn.addEventListener('click', () => {
        // Navegar para página anterior
        window.location.href = 'index.html';
    });
    
    nextBtn.addEventListener('click', () => {
        if (!nextBtn.disabled) {
            // Navegar para próxima página
            window.location.href = 'proxima-pagina.html';
        }
    });
}

// Redimensionar canvas ao mudar tamanho da janela
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});