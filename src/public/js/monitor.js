// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const ruleItems = document.querySelectorAll('.rule-item');
    const character = document.querySelector('.character');
    const floatingElements = document.querySelectorAll('.float-element');
    
    // Rule completion tracking
    let completedRules = new Set();
    
    // Modal functions
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        playSuccessSound();
    }
    
    function closeModalFunction() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners for modal
    learnMoreBtn.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalFunction);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunction();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
    });
    
    // Rule interactions
    ruleItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const ruleNumber = index + 1;
            
            // Add completion effect
            if (!completedRules.has(ruleNumber)) {
                item.style.background = 'linear-gradient(45deg, rgba(34, 211, 238, 0.2), rgba(59, 130, 246, 0.2))';
                item.style.border = '2px solid rgba(34, 211, 238, 0.5)';
                
                // Add sparkle effect
                createSparkles(item);
                
                // Mark as completed
                completedRules.add(ruleNumber);
                
                // Play interaction sound
                playClickSound();
                
                // Check if all rules are completed
                checkAllRulesCompleted();
            }
        });
        
        // Hover effects
        item.addEventListener('mouseenter', function() {
            playHoverSound();
            item.style.transform = 'translateX(15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            if (!completedRules.has(index + 1)) {
                item.style.transform = 'translateX(0) scale(1)';
            }
        });
    });
    
    // Character interactions
    character.addEventListener('click', function() {
        // Make character wave
        character.style.animation = 'wave 1s ease-in-out';
        playCharacterSound();
        
        setTimeout(() => {
            character.style.animation = 'float 3s ease-in-out infinite';
        }, 1000);
    });
    
    // Floating elements animation
    function animateFloatingElements() {
        floatingElements.forEach((element, index) => {
            const delay = index * 500;
            const duration = 3000 + (index * 500);
            
            setTimeout(() => {
                element.style.animation = `twinkle ${duration}ms ease-in-out infinite alternate`;
            }, delay);
        });
    }
    
    // Create sparkle effect
    function createSparkles(element) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = '1rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            
            const rect = element.getBoundingClientRect();
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(sparkle);
            
            // Animate sparkle
            sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }
    }
    
    // Check if all rules are completed
    function checkAllRulesCompleted() {
        if (completedRules.size === ruleItems.length) {
            setTimeout(() => {
                // Change button text and style
                learnMoreBtn.innerHTML = '<span>🎉 Parabéns! Clique aqui! 🎉</span><div class="btn-glow"></div>';
                learnMoreBtn.style.background = 'linear-gradient(45deg, #10B981, #FACC15)';
                learnMoreBtn.style.animation = 'pulse 1s ease-in-out infinite';
                
                // Create celebration effect
                createCelebration();
            }, 500);
        }
    }
    
    // Create celebration effect
    function createCelebration() {
        const emojis = ['🎉', '🌟', '⭐', '✨', '🏆', '🎊'];
        
        for (let i = 0; i < 15; i++) {
            const celebration = document.createElement('div');
            celebration.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            celebration.style.position = 'fixed';
            celebration.style.fontSize = '2rem';
            celebration.style.pointerEvents = 'none';
            celebration.style.zIndex = '999';
            celebration.style.left = Math.random() * window.innerWidth + 'px';
            celebration.style.top = '-50px';
            
            document.body.appendChild(celebration);
            
            // Animate falling celebration
            celebration.style.animation = 'celebrationFall 3s ease-out forwards';
            
            setTimeout(() => {
                if (celebration.parentNode) {
                    celebration.parentNode.removeChild(celebration);
                }
            }, 3000);
        }
    }
    
    // Sound effects (using Web Audio API)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function createTone(frequency, duration, type = 'sine') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    function playClickSound() {
        createTone(800, 0.2);
        setTimeout(() => createTone(1000, 0.1), 100);
    }
    
    function playHoverSound() {
        createTone(600, 0.1);
    }
    
    function playSuccessSound() {
        createTone(523, 0.2); // C
        setTimeout(() => createTone(659, 0.2), 200); // E
        setTimeout(() => createTone(784, 0.3), 400); // G
    }
    
    function playCharacterSound() {
        createTone(440, 0.15); // A
        setTimeout(() => createTone(554, 0.15), 150); // C#
        setTimeout(() => createTone(659, 0.2), 300); // E
    }
    
    // Add CSS animations via JavaScript
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
        }
        
        @keyframes sparkleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-50px) scale(0.5);
            }
        }
        
        @keyframes celebrationFall {
            0% {
                opacity: 1;
                transform: translateY(-50px) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 10px 30px rgba(59, 130, 246, 0.5);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 15px 40px rgba(250, 204, 21, 0.6);
            }
        }
        
        .rule-item.completed {
            animation: completionGlow 0.8s ease-out;
        }
        
        @keyframes completionGlow {
            0% {
                box-shadow: 0 0 0 rgba(34, 211, 238, 0.5);
            }
            50% {
                box-shadow: 0 0 30px rgba(34, 211, 238, 0.8);
            }
            100% {
                box-shadow: 0 5px 20px rgba(59, 130, 246, 0.3);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize animations
    animateFloatingElements();
    
    // Progressive disclosure for rules
    function revealRulesSequentially() {
        ruleItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.rule-item, .character-section').forEach(el => {
        observer.observe(el);
    });
    
    // Educational tips system
    const educationalTips = [
        "Dica: Sempre peça ajuda a um adulto quando não souber algo!",
        "Lembre-se: Segurança em primeiro lugar!",
        "Parabéns por aprender essas regras importantes!",
        "Você está se tornando muito responsável!",
        "Continue praticando essas regras todos os dias!"
    ];
    
    let tipIndex = 0;
    
    function showEducationalTip() {
        const tipElement = document.createElement('div');
        tipElement.className = 'educational-tip';
        tipElement.innerHTML = `
            <div class="tip-content">
                💡 ${educationalTips[tipIndex]}
            </div>
        `;
        
        tipElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 15px 20px;
            color: var(--text-primary);
            z-index: 1000;
            max-width: 300px;
            font-size: 0.9rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            animation: tipSlideIn 0.5s ease-out;
        `;
        
        document.body.appendChild(tipElement);
        
        setTimeout(() => {
            tipElement.style.animation = 'tipSlideOut 0.5s ease-out';
            setTimeout(() => {
                if (tipElement.parentNode) {
                    tipElement.parentNode.removeChild(tipElement);
                }
            }, 500);
        }, 4000);
        
        tipIndex = (tipIndex + 1) % educationalTips.length;
    }
    
    // Add tip animations to stylesheet
    style.textContent += `
        @keyframes tipSlideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes tipSlideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: slideInFromLeft 0.8s ease-out;
        }
        
        @keyframes slideInFromLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    
    // Show first tip after page loads
    setTimeout(showEducationalTip, 3000);
    
    // Show tips periodically if user is engaged
    let tipInterval;
    function startTipSystem() {
        tipInterval = setInterval(() => {
            if (completedRules.size > 0) {
                showEducationalTip();
            }
        }, 15000);
    }
    
    // Start tip system after first interaction
    let firstInteraction = false;
    document.addEventListener('click', () => {
        if (!firstInteraction) {
            firstInteraction = true;
            startTipSystem();
        }
    });
    
    // Progress tracking
    function updateProgress() {
        const progress = (completedRules.size / ruleItems.length) * 100;
        const progressElement = document.querySelector('.progress-bar');
        
        if (progressElement) {
            progressElement.style.width = `${progress}%`;
        }
        
        // Store progress in sessionStorage (not localStorage due to restrictions)
        sessionStorage.setItem('safetyRulesProgress', JSON.stringify({
            completed: Array.from(completedRules),
            percentage: progress
        }));
    }
    
    // Load saved progress (if any)
    function loadProgress() {
        const savedProgress = sessionStorage.getItem('safetyRulesProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            progress.completed.forEach(ruleNumber => {
                completedRules.add(ruleNumber);
                const ruleItem = ruleItems[ruleNumber - 1];
                if (ruleItem) {
                    ruleItem.style.background = 'linear-gradient(45deg, rgba(34, 211, 238, 0.2), rgba(59, 130, 246, 0.2))';
                    ruleItem.style.border = '2px solid rgba(34, 211, 238, 0.5)';
                }
            });
            checkAllRulesCompleted();
        }
    }
    
    // Initialize progress system
    loadProgress();
    
    // Add progress update to rule clicks
    const originalRuleClickHandler = ruleItems[0].onclick;
    ruleItems.forEach((item, index) => {
        const originalHandler = item.onclick;
        item.addEventListener('click', function(e) {
            updateProgress();
        });
    });
    
    // Reveal rules sequentially on load
    setTimeout(revealRulesSequentially, 500);
    
    // Add accessibility improvements
    ruleItems.forEach((item, index) => {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `Regra ${index + 1}: ${item.querySelector('h3').textContent}`);
        
        // Keyboard support
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
    
    // Add focus styles via JavaScript
    style.textContent += `
        .rule-item:focus {
            outline: 3px solid var(--color-accent);
            outline-offset: 2px;
        }
        
        .learn-more-btn:focus {
            outline: 3px solid var(--color-accent);
            outline-offset: 2px;
        }
    `;
    
    console.log('🎉 Página de Segurança para Crianças carregada com sucesso!');
    console.log(`📚 ${ruleItems.length} regras de segurança disponíveis para aprender!`);
});