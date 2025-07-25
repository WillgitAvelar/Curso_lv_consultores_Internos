/**
 * Lightbox para Seção de Imagens Adaptável - Litoral Verde
 * Permite visualização de imagens em tela cheia
 */

class ImageLightbox {
    constructor() {
        this.lightboxOverlay = null;
        this.lightboxContainer = null;
        this.lightboxImage = null;
        this.lightboxClose = null;
        this.zoomIndicator = null;
        this.currentImage = null;
        this.isOpen = false;
        
        this.init();
    }

    init() {
        // Criar estrutura HTML do lightbox
        this.createLightboxHTML();
        
        // Adicionar event listeners
        this.addEventListeners();
        
        // Tornar todas as imagens dentro de .adaptive-image-frame clicáveis
        this.makeImagesClickable();
    }

    createLightboxHTML() {
        // Criar overlay
        this.lightboxOverlay = document.createElement('div');
        this.lightboxOverlay.className = 'lightbox-overlay';
        
        // Criar container
        this.lightboxContainer = document.createElement('div');
        this.lightboxContainer.className = 'lightbox-container';
        
        // Criar imagem
        this.lightboxImage = document.createElement('img');
        this.lightboxImage.className = 'lightbox-image';
        this.lightboxImage.alt = 'Imagem ampliada';
        
        // Criar botão de fechar
        this.lightboxClose = document.createElement('button');
        this.lightboxClose.className = 'lightbox-close';
        this.lightboxClose.innerHTML = '×';
        this.lightboxClose.setAttribute('aria-label', 'Fechar lightbox');
        
        // Criar indicador de zoom
        this.zoomIndicator = document.createElement('div');
        this.zoomIndicator.className = 'zoom-indicator';
        this.zoomIndicator.textContent = 'Clique para fechar';
        
        // Montar estrutura
        this.lightboxContainer.appendChild(this.lightboxImage);
        this.lightboxContainer.appendChild(this.lightboxClose);
        this.lightboxContainer.appendChild(this.zoomIndicator);
        this.lightboxOverlay.appendChild(this.lightboxContainer);
        
        // Adicionar ao body
        document.body.appendChild(this.lightboxOverlay);
    }

    addEventListeners() {
        // Fechar ao clicar no overlay
        this.lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === this.lightboxOverlay) {
                this.close();
            }
        });

        // Fechar ao clicar no botão de fechar
        this.lightboxClose.addEventListener('click', () => {
            this.close();
        });

        // Fechar ao clicar na imagem
        this.lightboxImage.addEventListener('click', () => {
            this.close();
        });

        // Fechar com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Prevenir propagação de cliques no container
        this.lightboxContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    makeImagesClickable() {
        // Selecionar todas as imagens dentro de .adaptive-image-frame
        const images = document.querySelectorAll('.adaptive-image-frame img');
        
        images.forEach(img => {
            // Adicionar atributo data-lightbox
            img.setAttribute('data-lightbox', 'true');
            
            // Adicionar cursor pointer
            img.style.cursor = 'pointer';
            
            // Adicionar event listener
            img.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(img);
            });
        });
    }

    open(imageElement) {
        if (this.isOpen) return;
        
        this.currentImage = imageElement;
        this.isOpen = true;
        
        // Mostrar loading
        this.showLoading();
        
        // Definir src da imagem do lightbox
        this.lightboxImage.src = imageElement.src;
        this.lightboxImage.alt = imageElement.alt || 'Imagem ampliada';
        
        // Mostrar overlay
        this.lightboxOverlay.classList.add('active');
        
        // Prevenir scroll do body
        document.body.classList.add('lightbox-active');
        
        // Aguardar carregamento da imagem
        this.lightboxImage.onload = () => {
            this.hideLoading();
        };
        
        this.lightboxImage.onerror = () => {
            this.hideLoading();
            this.zoomIndicator.textContent = 'Erro ao carregar imagem';
        };
    }

    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        
        // Esconder overlay
        this.lightboxOverlay.classList.remove('active');
        
        // Permitir scroll do body
        document.body.classList.remove('lightbox-active');
        
        // Limpar imagem após animação
        setTimeout(() => {
            this.lightboxImage.src = '';
            this.zoomIndicator.textContent = 'Clique para fechar';
        }, 300);
        
        this.currentImage = null;
    }

    showLoading() {
        if (!document.querySelector('.lightbox-loading')) {
            const loading = document.createElement('div');
            loading.className = 'lightbox-loading';
            this.lightboxContainer.appendChild(loading);
        }
    }

    hideLoading() {
        const loading = document.querySelector('.lightbox-loading');
        if (loading) {
            loading.remove();
        }
    }

    // Método para adicionar novas imagens dinamicamente
    addImage(imageElement) {
        if (!imageElement.hasAttribute('data-lightbox')) {
            imageElement.setAttribute('data-lightbox', 'true');
            imageElement.style.cursor = 'pointer';
            
            imageElement.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(imageElement);
            });
        }
    }

    // Método para remover lightbox de uma imagem
    removeImage(imageElement) {
        imageElement.removeAttribute('data-lightbox');
        imageElement.style.cursor = 'default';
        
        // Remover event listeners (seria necessário manter referência)
        // Por simplicidade, apenas removemos os atributos
    }

    // Método para destruir o lightbox
    destroy() {
        if (this.lightboxOverlay && this.lightboxOverlay.parentNode) {
            this.lightboxOverlay.parentNode.removeChild(this.lightboxOverlay);
        }
        
        document.body.classList.remove('lightbox-active');
        
        // Remover event listeners globais
        document.removeEventListener('keydown', this.handleKeydown);
    }
}

// Inicializar lightbox quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Criar instância global do lightbox
    window.imageLightbox = new ImageLightbox();
    
    // Função para adicionar lightbox a novas imagens (útil para conteúdo dinâmico)
    window.addLightboxToImage = function(imageElement) {
        if (window.imageLightbox) {
            window.imageLightbox.addImage(imageElement);
        }
    };
    
    // Observer para detectar novas imagens adicionadas dinamicamente
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    // Verificar se o próprio node é uma imagem dentro de adaptive-image-frame
                    if (node.matches && node.matches('.adaptive-image-frame img')) {
                        window.imageLightbox.addImage(node);
                    }
                    
                    // Verificar imagens filhas
                    const images = node.querySelectorAll && node.querySelectorAll('.adaptive-image-frame img');
                    if (images) {
                        images.forEach(img => {
                            window.imageLightbox.addImage(img);
                        });
                    }
                }
            });
        });
    });
    
    // Observar mudanças no DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Função utilitária para uso manual
function initializeLightbox() {
    if (!window.imageLightbox) {
        window.imageLightbox = new ImageLightbox();
    }
}

