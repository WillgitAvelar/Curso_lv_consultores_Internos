// Funcionalidade de Zoom para Imagens
class ImageZoom {
    constructor() {
        this.isZoomed = false;
        this.currentImage = null;
        this.overlay = null;
        this.closeBtn = null;
        this.init();
    }

    init() {
        // Aguarda o DOM estar carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Adiciona indicadores de zoom às imagens
        this.addZoomIndicators();
        
        // Event listener para cliques nas imagens
        document.addEventListener('click', (e) => {
            const img = e.target.closest('.adaptive-image-frame img');
            if (img) {
                e.preventDefault();
                this.toggleZoom(img);
            }
        });

        // Event listener para tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isZoomed) {
                this.closeZoom();
            }
        });

        // Previne o scroll da página quando uma imagem está com zoom
        document.addEventListener('wheel', (e) => {
            if (this.isZoomed) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    addZoomIndicators() {
        const imageFrames = document.querySelectorAll('.adaptive-image-frame');
        imageFrames.forEach(frame => {
            if (!frame.querySelector('.zoom-indicator')) {
                const indicator = document.createElement('div');
                indicator.className = 'zoom-indicator';
                indicator.innerHTML = '🔍 Clique para ampliar';
                frame.appendChild(indicator);
            }
        });
    }

    toggleZoom(img) {
        if (this.isZoomed) {
            this.closeZoom();
        } else {
            this.openZoom(img);
        }
    }

    openZoom(img) {
        if (this.isZoomed) return;

        this.currentImage = img;
        this.isZoomed = true;

        // Adiciona classe ao body para prevenir scroll
        document.body.classList.add('zoom-active');

        // Cria overlay
        this.createOverlay();

        // Cria botão de fechar
        this.createCloseButton();

        // Aplica zoom na imagem
        img.classList.add('zoomed');

        // Ativa overlay e botão
        setTimeout(() => {
            if (this.overlay) this.overlay.classList.add('active');
            if (this.closeBtn) this.closeBtn.classList.add('active');
        }, 50);
    }

    closeZoom() {
        if (!this.isZoomed || !this.currentImage) return;

        this.isZoomed = false;

        // Remove classe do body
        document.body.classList.remove('zoom-active');

        // Remove zoom da imagem
        this.currentImage.classList.remove('zoomed');

        // Remove overlay e botão
        if (this.overlay) {
            this.overlay.classList.remove('active');
            setTimeout(() => {
                if (this.overlay && this.overlay.parentNode) {
                    this.overlay.parentNode.removeChild(this.overlay);
                }
                this.overlay = null;
            }, 300);
        }

        if (this.closeBtn) {
            this.closeBtn.classList.remove('active');
            setTimeout(() => {
                if (this.closeBtn && this.closeBtn.parentNode) {
                    this.closeBtn.parentNode.removeChild(this.closeBtn);
                }
                this.closeBtn = null;
            }, 300);
        }

        this.currentImage = null;
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'zoom-overlay';
        
        // Clique no overlay fecha o zoom
        this.overlay.addEventListener('click', () => {
            this.closeZoom();
        });

        document.body.appendChild(this.overlay);
    }

    createCloseButton() {
        this.closeBtn = document.createElement('button');
        this.closeBtn.className = 'zoom-close-btn';
        this.closeBtn.innerHTML = '✕';
        this.closeBtn.title = 'Fechar (ESC)';
        
        // Clique no botão fecha o zoom
        this.closeBtn.addEventListener('click', () => {
            this.closeZoom();
        });

        document.body.appendChild(this.closeBtn);
    }

    // Método público para fechar zoom (pode ser chamado externamente)
    close() {
        this.closeZoom();
    }

    // Método público para verificar se está com zoom ativo
    isActive() {
        return this.isZoomed;
    }
}

// Inicializa a funcionalidade de zoom
const imageZoom = new ImageZoom();

// Exporta para uso global (opcional)
window.ImageZoom = imageZoom;

