function startQuiz() {
    // Adicionar efeito de transição suave
    document.querySelector('.main-card').style.transform = 'scale(0.95)';
    document.querySelector('.main-card').style.opacity = '0';
    
    // Redirecionar após a animação
    setTimeout(() => {
        window.location.href = '/pagina-do-quiz.html'; // Ajuste o caminho conforme necessário
    }, 300);
}