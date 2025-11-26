// Gerenciador de música - SIMPLES E DIRETO
// Usa o elemento <audio> do HTML que persiste entre navegações

class GameMusic {
    constructor() {
        this.audio = null;
    }

    getAudio() {
        if (!this.audio) {
            this.audio = document.getElementById('background-music');
            if (this.audio) {
                console.log('🎵 Elemento de áudio encontrado');
                this.setupListeners();
            }
        }
        return this.audio;
    }

    setupListeners() {
        if (!this.audio) return;

        this.audio.addEventListener('play', () => {
            console.log('▶️ Tocando!');
            sessionStorage.setItem('musicPlaying', 'true');
        });

        this.audio.addEventListener('pause', () => {
            console.log('⏸️ Pausado');
            sessionStorage.setItem('musicPlaying', 'false');
        });

        this.audio.addEventListener('error', (e) => {
            console.error('❌ Erro:', e.message);
        });
    }

    play() {
        const audio = this.getAudio();
        if (!audio) {
            console.log('⏳ Áudio não pronto');
            return;
        }

        if (!audio.paused) {
            console.log('🔊 Já tocando');
            return;
        }

        console.log('▶️ Play...');
        audio.volume = 0.3;
        
        audio.play()
            .then(() => {
                console.log('✅ OK');
                sessionStorage.setItem('musicPlaying', 'true');
            })
            .catch(e => {
                console.warn('⚠️ ' + e.message);
            });
    }

    pause() {
        const audio = this.getAudio();
        if (audio && !audio.paused) {
            audio.pause();
        }
    }

    isPlaying() {
        const audio = this.getAudio();
        return audio && !audio.paused;
    }

    setVolume(volume) {
        const audio = this.getAudio();
        if (audio) {
            audio.volume = Math.max(0, Math.min(1, volume));
        }
    }
}

const gameMusic = new GameMusic();

console.log('🎮 gameMusic.js loaded');

// Ao carregar página
document.addEventListener('DOMContentLoaded', () => {
    gameMusic.getAudio();
    
    // Se estava tocando, retoma
    const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';
    if (wasPlaying) {
        setTimeout(() => {
            gameMusic.play();
            console.log('↻ Retomando...');
        }, 200);
    }
});

// Primeira interação do usuário
let firstInteraction = false;
const startMusic = () => {
    if (!firstInteraction) {
        console.log('👆 Start');
        gameMusic.play();
        firstInteraction = true;
    }
};

document.addEventListener('click', startMusic);
document.addEventListener('touchstart', startMusic);

console.log('✅ Ready');

console.log('✅ gameMusic pronto');
