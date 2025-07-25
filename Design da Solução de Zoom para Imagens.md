## Design da Solução de Zoom para Imagens

### Objetivo:
Substituir a funcionalidade de lightbox existente por um efeito de zoom na própria imagem ao ser clicada, permitindo que o usuário veja detalhes sem sair da página.

### Componentes:
1.  **CSS (`image_zoom.css`):**
    - Definir uma classe `zoomed` que aplicará a transformação de escala (`transform: scale(X)`) e transição suave.
    - Garantir que a imagem ampliada fique centralizada e visível (e.g., `transform-origin: center center;`).
    - Adicionar `z-index` para que a imagem ampliada fique acima de outros elementos.
    - Adicionar um overlay escuro semi-transparente por trás da imagem ampliada para focar a atenção.

2.  **JavaScript (`image_zoom.js`):**
    - Detectar cliques nas imagens dentro dos `adaptive-image-container`.
    - Ao clicar, adicionar/remover a classe `zoomed` da imagem.
    - Criar um overlay dinâmico (div) que será adicionado ao `body` quando a imagem for ampliada e removido quando a imagem voltar ao normal.
    - O overlay também servirá como área clicável para fechar o zoom.
    - Implementar a funcionalidade de fechar o zoom ao pressionar a tecla `ESC`.

### Interação:
- **Clique na imagem:** A imagem aplica um efeito de zoom, e um overlay escuro aparece por trás.
- **Clique na imagem ampliada ou no overlay:** A imagem retorna ao tamanho normal e o overlay desaparece.
- **Pressionar ESC:** A imagem retorna ao tamanho normal e o overlay desaparece.

### Considerações:
- Reutilizar a estrutura `adaptive-image-container` e `adaptive-image-frame`.
- Remover o `lightbox.js` e o `adaptive_image_with_lightbox.css` existentes e substituí-los pelos novos arquivos de zoom.
- A transição deve ser suave para uma boa experiência do usuário.
- A imagem ampliada deve ser responsiva e não estourar a tela em diferentes tamanhos de viewport.


