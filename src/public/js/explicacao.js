// Efeito de digitação para os textos de explicação
document.addEventListener('DOMContentLoaded', function() {
    const ruleParagraphs = document.querySelectorAll('.rule-text p');
    
    ruleParagraphs.forEach((p, index) => {
        // Calcula o tempo total da animação baseado no delay + duração
        const animationDelay = [0.3, 1, 1.7, 2.4, 3.1][index] || 0.5;
        const animationDuration = 4; // 4 segundos
        const totalTime = (animationDelay + animationDuration) * 1000;
        
        // Remove o cursor após a animação completar
        setTimeout(() => {
            p.classList.add('typing-complete');
            p.style.whiteSpace = 'normal';
            p.style.borderRight = 'none';
        }, totalTime);
    });
});