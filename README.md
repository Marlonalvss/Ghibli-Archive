
# Ghibli Archive

**Ghibli Archive** é um projeto que exibe filmes do Studio Ghibli, permitindo que os usuários filtrem filmes por título, ano de lançamento e diretor. A aplicação oferece uma experiência interativa com informações detalhadas sobre cada filme, como descrição, diretor, produtor e tempo de execução.

![Ghibli Archive](./src/StudioGhibli.png)

## 🌎 Demo

[Ghibli Archive - Live Demo](https://marlonalvss.github.io/Ghibli/)

## 🚀 Funcionalidades

- **Busca Inteligente**: Pesquise filmes em português ou inglês
- **Filtros Avançados**: Filtre por título, ano de lançamento e diretor
- **Ordenação**: Organize por mais recentes ou mais antigos
- **Suporte Bilíngue**: Interface completa em PT-BR e EN-US (títulos e sinopses traduzidos)
- **Modal Detalhado**: Informações completas dos filmes com banner, poster, sinopse, diretor e produtor
- **Design Responsivo**: Experiência otimizada para desktop e mobile
- **Menu Mobile**: Drawer lateral com filtros para dispositivos móveis

## 🎨 Tecnologias

- **HTML5** - Estrutura semântica
- **Tailwind CSS** - Estilização moderna e responsiva
- **JavaScript ES6+** - Módulos, async/await, e padrões modernos
- **API Studio Ghibli** - [ghibliapi.vercel.app](https://ghibliapi.vercel.app/)

## 📁 Estrutura do Projeto

```
Ghibli/
├── index.html              # Página principal
├── styles/
│   └── main.css           # Estilos customizados
└── js/
    ├── main.js            # Lógica principal e inicialização
    ├── config.js          # Configurações, traduções e i18n
    ├── theme-config.js    # Configuração do Tailwind
    ├── components/
    │   ├── card.js        # Componente de card de filme
    │   ├── modal.js       # Modal de detalhes do filme
    │   └── drawer.js      # Menu mobile
    ├── services/
    │   ├── api.js         # Comunicação com a API
    │   └── i18n.js        # Sistema de internacionalização
    ├── state/
    │   └── store.js       # Gerenciamento de estado
    └── utils/
        ├── dom.js         # Referências de elementos DOM
        └── helpers.js     # Funções utilitárias
```

## 🛠️ Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/Marlonalvss/Ghibli.git
cd Ghibli

# Inicie um servidor local (necessário para módulos ES6)
npx serve .

# Acesse http://localhost:3000
```

## 🤖 Refatoração

Este projeto foi refatorado com o auxílio de **Inteligência Artificial**, seguindo diretrizes de design e código definidas por mim (Marlon Alves). A IA ajudou na:

- Limpeza e organização do código
- Implementação do sistema de internacionalização (i18n)
- Tradução das sinopses dos filmes para português
- Modularização dos componentes JavaScript
- Remoção de código duplicado e comentários desnecessários

## 💬 Contato

**Marlon Alves**
- LinkedIn: [linkedin.com/in/marlon-alvss](https://www.linkedin.com/in/marlon-alvss/)
- GitHub: [github.com/Marlonalvss](https://github.com/Marlonalvss)

## 📝 Licença

Projeto feito para fins de estudo e paixão por animação. Não afiliado ao Studio Ghibli.
