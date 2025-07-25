# Design da Seção de Imagens Responsiva

## Análise do Código Atual

### Classes CSS Identificadas:
1. **`.image-placeholder`**: Contêiner para placeholders de imagens
   - Dimensões fixas: 300px de altura
   - Background gradiente verde
   - Borda tracejada
   - Centralização de conteúdo

2. **`.content-image`**: Imagens de conteúdo
   - Dimensões fixas: 600px x 800px
   - `object-fit: contain` (preserva proporção)

## Problemas Identificados:
- Dimensões fixas não se adaptam ao conteúdo da imagem
- Falta de flexibilidade para diferentes tamanhos de imagem
- Não há uma classe específica para molduras adaptáveis

## Solução Proposta:

### 1. Nova Classe CSS: `.adaptive-image-frame`
- Moldura que se ajusta automaticamente ao tamanho da imagem
- Mantém proporção da imagem original
- Responsiva para diferentes dispositivos
- Estilo visual consistente com o tema verde do site

### 2. Funcionalidades:
- **Auto-ajuste**: A moldura se adapta às dimensões da imagem
- **Responsividade**: Funciona em desktop e mobile
- **Facilidade de uso**: Simples inserção via HTML
- **Estilo consistente**: Mantém a identidade visual do site

### 3. Características Técnicas:
- Uso de `display: inline-block` ou `display: flex`
- `max-width: 100%` para responsividade
- `height: auto` para manter proporção
- Bordas e sombras consistentes com o design atual
- Transições suaves para hover effects

### 4. Estrutura HTML Proposta:
```html
<div class="adaptive-image-frame">
    <img src="caminho-da-imagem.jpg" alt="Descrição da imagem">
</div>
```

### 5. Benefícios:
- Inserção simples de imagens
- Moldura se ajusta automaticamente
- Mantém qualidade visual
- Compatível com o design existente
- Responsivo para todos os dispositivos

