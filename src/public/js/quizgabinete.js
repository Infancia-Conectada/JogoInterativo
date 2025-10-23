// Selecionar elementos
const alternativeBoxes = document.querySelectorAll('.alternative-box');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

// Configurar canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Variável para controlar se já respondeu
let selectedAnswer = null;

// Adicionar evento de clique nas alternativas
alternativeBoxes.forEach(box => {
    box.addEventListener('click', () => {
        // Remover seleção anterior
        alternativeBoxes.forEach(b => b.classList.remove('selected'));
        
        // Adicionar seleção na alternativa clicada
        box.classList.add('selected');
        selectedAnswer = box.dataset.answer;
        
        // Verificar se é a resposta correta (alternativa marcada com class "correct-answer")
        if (box.classList.contains('correct-answer')) {
            setTimeout(() => {
                launchConfetti();
            }, 300);
        }
    });
});

// Evento do botão Próxima Página
nextBtn.addEventListener('click', () => {
    if (selectedAnswer) {
        console.log('Resposta selecionada:', selectedAnswer);
        // Aqui você pode adicionar lógica para ir para próxima página
        // window.location.href = 'proxima-pagina.html';
    } else {
        alert('Por favor, selecione uma alternativa!');
    }
});

// Evento do botão Página Anterior
prevBtn.addEventListener('click', () => {
    console.log('Voltando para página anterior');
    // Aqui você pode adicionar lógica para voltar à página anterior
    // window.location.href = 'pagina-anterior.html';
});

// Função de confetes
function launchConfetti() {
    const confettiCount = 150;
    const confetti = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa07a', '#98d8c8', '#f7dc6f', '#bb8fce'];
    
    // Criar partículas de confete
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * confettiCount,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }
    
    let animationFrame;
    
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((c, index) => {
            ctx.beginPath();
            ctx.lineWidth = c.r / 2;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 5);
            ctx.stroke();
            
            // Atualizar posição
            c.tiltAngle += c.tiltAngleIncremental;
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
            c.tilt = Math.sin(c.tiltAngle - c.d / 3) * 15;
            
            // Remover confete quando sair da tela
            if (c.y > canvas.height) {
                confetti.splice(index, 1);
            }
        });
        
        if (confetti.length > 0) {
            animationFrame = requestAnimationFrame(drawConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            cancelAnimationFrame(animationFrame);
        }
    }
    
    drawConfetti();
}