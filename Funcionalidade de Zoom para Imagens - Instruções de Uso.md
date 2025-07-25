# Funcionalidade de Zoom para Imagens - Instruções de Uso

## 📋 Visão Geral

A funcionalidade de zoom permite que os usuários ampliem as imagens ao clicar nelas, proporcionando uma melhor visualização dos detalhes sem sair da página atual. Esta solução substitui o lightbox anterior por uma experiência mais fluida e intuitiva.

## 🎯 Funcionalidades Implementadas

### ✅ Zoom Interativo
- **Clique na imagem**: Amplia a imagem com efeito de zoom suave
- **Clique na imagem ampliada**: Retorna ao tamanho normal
- **Clique no overlay escuro**: Fecha o zoom
- **Botão X**: Fecha o zoom
- **Tecla ESC**: Fecha o zoom

### ✅ Indicadores Visuais
- Indicador "🔍 Clique para ampliar" aparece ao passar o mouse sobre a imagem
- Efeitos hover suaves nas imagens
- Transições animadas para abertura e fechamento

### ✅ Design Responsivo
- Funciona perfeitamente em desktop, tablet e mobile
- Imagens se ajustam automaticamente ao tamanho da tela
- Controles otimizados para dispositivos touch

## 📁 Arquivos Necessários

1. **`image_zoom.css`** - Estilos CSS para a funcionalidade de zoom
2. **`image_zoom.js`** - JavaScript que controla o comportamento do zoom
3. **`index.html`** - Arquivo HTML atualizado com as novas referências

## 🚀 Como Usar

### Estrutura HTML
```html
<div class="adaptive-image-container">
    <div class="adaptive-image-frame">
        <img src="sua-imagem.jpg" alt="Descrição da imagem">
        <div class="adaptive-image-caption">Legenda da imagem</div>
    </div>
</div>
```

### Inclusão dos Arquivos
No `<head>` do HTML:
```html
<link rel="stylesheet" href="image_zoom.css">
```

Antes do fechamento do `</body>`:
```html
<script src="image_zoom.js"></script>
```

## 🎨 Variações de Estilo

### Estilo Padrão
```html
<div class="adaptive-image-frame">
    <!-- Moldura verde padrão -->
</div>
```

### Estilo Sutil
```html
<div class="adaptive-image-frame style-subtle">
    <!-- Moldura verde mais suave -->
</div>
```

### Estilo Elevado
```html
<div class="adaptive-image-frame style-elevated">
    <!-- Moldura com mais destaque e sombra -->
</div>
```

## ⚙️ Configurações Técnicas

### Níveis de Zoom
- **Desktop**: 1.5x de ampliação
- **Tablet**: 1.2x de ampliação
- **Mobile**: 1.1x de ampliação

### Animações
- **Duração**: 0.4 segundos
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Efeito**: Zoom suave com fade-in/fade-out

### Controles
- **Overlay**: Fundo escuro semi-transparente (80% opacidade)
- **Botão Fechar**: Canto superior direito com ícone ✕
- **Área Clicável**: Toda a imagem e overlay

## 🔧 Personalização

### Cores da Moldura
As cores seguem o tema verde do site:
- **Verde Primário**: #2E8B57
- **Verde Secundário**: #3CB371
- **Verde Claro**: #90EE90
- **Verde Escuro**: #1F5F3F

### Modificar Nível de Zoom
No arquivo `image_zoom.css`, altere a propriedade `transform`:
```css
.adaptive-image-frame img.zoomed {
    transform: translate(-50%, -50%) scale(1.5); /* Altere o valor 1.5 */
}
```

### Modificar Velocidade da Animação
No arquivo `image_zoom.css`, altere a propriedade `transition`:
```css
.adaptive-image-frame img {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* Altere 0.4s */
}
```

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

### Dispositivos
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablets (iOS, Android)
- ✅ Smartphones (iOS, Android)

## 🐛 Solução de Problemas

### Imagem não amplia ao clicar
1. Verifique se o arquivo `image_zoom.js` está sendo carregado
2. Confirme se a estrutura HTML está correta
3. Verifique o console do navegador para erros JavaScript

### Zoom não fecha
1. Verifique se os event listeners estão funcionando
2. Teste pressionar a tecla ESC
3. Tente clicar no botão X ou no overlay

### Imagem fica cortada no zoom
1. Verifique se as propriedades CSS `max-width` e `max-height` estão definidas
2. Confirme se o viewport está configurado corretamente

## 📞 Suporte

Para dúvidas ou problemas com a implementação:
1. Verifique se todos os arquivos estão na mesma pasta
2. Confirme se os caminhos dos arquivos CSS e JS estão corretos
3. Teste em diferentes navegadores e dispositivos

## 🔄 Atualizações Futuras

Possíveis melhorias que podem ser implementadas:
- Zoom com scroll do mouse
- Navegação entre múltiplas imagens
- Zoom com pinch-to-zoom em dispositivos touch
- Galeria de imagens integrada
- Zoom com lupa para detalhes específicos

---

**Versão**: 1.0  
**Data**: 24/07/2025  
**Compatibilidade**: Todos os navegadores modernos

