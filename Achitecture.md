# Arquitetura da aplicação — Nuvem que apaga o fogo

## 1. Objetivo

Aplicação web interativa e educativa: ao clicar no cenário ou em um botão, o usuário faz uma nuvem aparecer e chover sobre um foco de fogo. A chuva reduz as chamas até apagá-las, com animação e uma mensagem de conclusão.

## 2. Escopo do MVP

- Exibir um cenário com céu, nuvem, solo e fogo.
- Iniciar a ação por clique em um botão claramente identificado; o cenário também pode ser clicável.
- Animar a nuvem até uma posição sobre o fogo e, em seguida, iniciar a chuva.
- Reduzir gradualmente a intensidade do fogo e encerrar a chuva quando ele for apagado.
- Mostrar o resultado e permitir reiniciar a experiência.
- Oferecer controles acessíveis por teclado e respeitar a preferência por movimento reduzido.

O MVP não precisa de contas, banco de dados ou API: a interação é local e não armazena dados do usuário.

## 3. Arquitetura proposta

Uma aplicação frontend estática, executada no navegador. HTML fornece a estrutura semântica, CSS cuida da apresentação e das animações, e JavaScript/TypeScript controla a sequência da interação e o estado da experiência. SVG é recomendado para nuvem, fogo e cenário por permitir gráficos escaláveis e animações leves.

```text
Navegador
└── Aplicação web
	├── Interface (HTML)
	├── Apresentação e animações (CSS + SVG)
	└── Controle da experiência (JavaScript/TypeScript)
```

Não há comunicação com servidor no fluxo principal. Se futuramente forem necessários placar compartilhado, conteúdo remoto ou persistência entre dispositivos, uma API poderá ser adicionada sem alterar a responsabilidade da interface pela animação local.

## 4. Organização sugerida

```text
web/
├── index.html              # estrutura da página e controles acessíveis
├── package.json            # scripts e dependências do frontend
├── vite.config.ts          # configuração do servidor e dos testes
└── src/
	├── main.ts             # inicialização e eventos da interface
	├── experience.ts       # estados e sequência de chuva e extinção
	├── experience.test.ts  # testes das transições
	└── styles.css          # layout, estados visuais e animações
```

O frontend é mantido em `web/`, separado do projeto de console .NET existente. As ilustrações SVG do cenário ficam incorporadas à página para permitir que os estados da experiência controlem suas animações diretamente.

## 5. Componentes e responsabilidades

- **Interface:** apresenta o cenário, o botão de ação, o botão de reinício e uma área de mensagem com o resultado.
- **Controlador da experiência:** recebe a ação do usuário, impede acionamentos duplicados durante a animação e coordena as transições.
- **Cenário:** ilustra nuvem, gotas, fogo e fumaça; recebe classes ou atributos de estado para refletir a progressão.
- **Estilos e animações:** posicionam os elementos e definem transições visuais; não decidem a lógica do jogo.

## 6. Fluxo e estados

```text
PRONTO → NUVEM_SE_MOVENDO → CHOVENDO → FOGO_APAGADO
   ↑                                          │
   └──────────────── REINICIAR ───────────────┘
```

1. No estado **PRONTO**, o fogo está aceso e o controle de ação está disponível.
2. No clique, o controlador muda para **NUVEM_SE_MOVENDO** e desabilita novas ações até a conclusão.
3. Ao terminar a transição da nuvem, muda para **CHOVENDO**; gotas aparecem e a intensidade visual do fogo diminui.
4. Ao término da chuva, muda para **FOGO_APAGADO**, remove ou oculta as chamas e anuncia o resultado.
5. **REINICIAR** restaura o cenário e retorna ao estado **PRONTO**.

As mudanças de estado devem ser a fonte de verdade; os elementos visuais apenas refletem o estado atual. Isso evita que cliques repetidos iniciem animações concorrentes.

## 7. Acessibilidade e experiência

- Usar um botão HTML real, com nome acessível, foco visível e acionamento por teclado.
- Não depender apenas de cor ou animação para comunicar que o fogo foi apagado; anunciar o resultado em uma região `aria-live`.
- Respeitar `prefers-reduced-motion`, reduzindo ou substituindo movimentos não essenciais.
- Manter contraste adequado e garantir que os controles continuem utilizáveis em telas pequenas.
- Não iniciar som automaticamente; se houver som no futuro, oferecer controle explícito de reprodução e volume.

## 8. Testes e critérios de aceite

- Um clique inicia a sequência e cliques adicionais não duplicam a chuva.
- O fogo permanece visível durante a ação e termina apagado; reiniciar restaura o cenário inicial.
- O controle funciona por teclado e o resultado é anunciado por tecnologia assistiva.
- A experiência continua compreensível com movimento reduzido e em viewport estreita.
- A interface pode ser servida como conteúdo estático, sem depender de chamadas de rede para a interação principal.

## 9. Evolução

Manter a primeira versão pequena e sem backend. Se o produto passar a precisar de conteúdo configurável, placares ou progresso persistente, introduzir uma API e armazenamento como componentes separados, preservando no navegador a apresentação e o controle das animações.