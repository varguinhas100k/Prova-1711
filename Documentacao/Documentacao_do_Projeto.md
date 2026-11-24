# Documentação do projeto — Chuva boa

> **Tipo:** aplicação web interativa e educativa  
> **Status:** MVP  
> **Idioma da interface:** português (Brasil)

## 1. Visão geral

Chuva boa é uma experiência interativa em que o usuário chama uma nuvem para apagar um pequeno foco de fogo ilustrado. A nuvem se move sobre o fogo, a chuva começa, as chamas desaparecem e uma mensagem informa que a ação foi concluída. Depois, o usuário pode recomeçar.

> **Importante:** trata-se apenas de uma simulação visual. A aplicação não detecta nem apaga incêndios reais e não substitui procedimentos de segurança ou o contato com serviços de emergência.

## 2. Objetivo e escopo

O MVP oferece uma interação curta, acessível e responsiva, executada inteiramente no navegador.

Inclui:

- Cenário ilustrado com nuvem, chuva, fogo, vegetação e mensagens de estado.
- Botão **Chamar a chuva** e controle **Recomeçar** após a conclusão.
- Animações da nuvem, das gotas e do fogo.
- Suporte a telas estreitas, navegação por teclado e preferência por movimento reduzido.

Fora do escopo atual: contas de usuário, persistência de progresso, banco de dados, API e placar compartilhado. A interação não envia nem armazena dados do usuário.

## 3. Tecnologias

| Tecnologia | Responsabilidade |
|---|---|
| HTML5 | Estrutura semântica da página e controles acessíveis. |
| TypeScript | Estados, transições e coordenação da experiência. |
| CSS3 | Layout responsivo, apresentação e animações. |
| SVG | Ilustração escalável do cenário. |
| Node.js e npm | Ambiente de desenvolvimento e dependências. |
| Vite | Servidor local e geração dos arquivos estáticos. |
| Vitest | Testes unitários das transições de estado. |

## 4. Arquitetura e estrutura

A aplicação web está em `web/` e é independente do projeto de console .NET na pasta `Prova171126/`. O navegador carrega a página HTML, aplica os estilos CSS e executa o TypeScript preparado pelo Vite. Não há servidor de aplicação no fluxo principal.

```text
.
├── Documentacao/
│   ├── Documentacao_do_Projeto.md
│   └── Documentacao_do_Projeto.docx
├── Prova171126/                 # projeto de console .NET independente
├── web/
│   ├── index.html               # estrutura, controles e cenário SVG
│   ├── package.json             # scripts e dependências
│   ├── package-lock.json        # versões resolvidas das dependências
│   ├── tsconfig.json            # configuração do TypeScript
│   ├── vite.config.ts           # configuração do Vite e Vitest
│   └── src/
│       ├── main.ts              # inicialização, eventos e interface
│       ├── experience.ts        # estados e transições da experiência
│       ├── experience.test.ts   # testes de transição
│       ├── styles.css           # layout, responsividade e animações
│       └── vite-env.d.ts        # tipos de ambiente do Vite
├── Achitecture.md               # proposta de arquitetura
├── Buiseness_rules.md           # regras de negócio
└── stck.md                      # proposta de stack tecnológico
```

As ilustrações SVG estão incorporadas em `web/index.html` para que o CSS possa animar diretamente os elementos do cenário. A lógica de transição fica separada da interface em `web/src/experience.ts`, facilitando seus testes sem depender do navegador.

## 5. Fluxo da experiência

```text
Pronto → Nuvem se movendo → Chovendo → Fogo apagado
   ↑                                          │
   └────────────────── Recomeçar ─────────────┘
```

1. **Pronto:** o fogo está aceso e o botão de ação está habilitado.
2. **Nuvem se movendo:** o clique inicia a sequência e bloqueia novas ativações.
3. **Chovendo:** depois que a nuvem chega, as gotas aparecem e as chamas diminuem.
4. **Fogo apagado:** as chamas desaparecem e uma mensagem textual anuncia a conclusão.
5. **Recomeçar:** restaura o cenário inicial e permite executar a experiência novamente.

Eventos que não pertencem ao estado atual são ignorados. Assim, cliques repetidos não iniciam sequências concorrentes e o reinício só é permitido após a conclusão.

## 6. Regras de negócio

- A sequência deve ocorrer na ordem nuvem → chuva → fogo apagado.
- Uma única sequência pode estar em andamento por vez.
- A confirmação de sucesso só aparece ao fim da chuva.
- O botão de reinício fica disponível após a conclusão.
- Recomeçar restaura elementos, mensagens e controles ao estado inicial.
- O progresso existe apenas na sessão atual e não é persistido.
- A aplicação deve ser apresentada como simulação, não como ferramenta de combate a incêndios.

## 7. Acessibilidade e experiência

- O botão é um controle HTML real, acionável por clique ou teclado.
- O foco do teclado tem destaque visual.
- A mensagem de estado é anunciada por uma região `aria-live`.
- A preferência `prefers-reduced-motion` reduz a duração da sequência e as animações não essenciais.
- O layout adapta-se a telas pequenas.
- A experiência não inicia som automaticamente.

## 8. Requisitos para desenvolvimento

- Node.js **20.19 ou superior**, ou **22.12 ou superior**.
- npm incluído com a instalação do Node.js.

O projeto pode usar versões mais recentes compatíveis com o Vite instalado.

## 9. Executar localmente

A partir da raiz do repositório, entre na pasta web e instale as dependências:

```bash
cd web
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite informa o endereço local no terminal. Por padrão, normalmente é `http://localhost:5173`.

## 10. Testar e gerar build

Execute os testes unitários das transições:

```bash
npm test
```

Verifique os tipos e gere os arquivos de produção:

```bash
npm run build
```

Os arquivos publicáveis são gerados em `web/dist/` e podem ser servidos por uma hospedagem de conteúdo estático. A interação principal não depende de chamadas de rede.

## 11. Critérios de aceite do MVP

- Um acionamento inicia uma única sequência na ordem definida.
- Ativações repetidas durante a animação não duplicam a chuva.
- O estado final só é anunciado após o término da chuva.
- O reinício restaura a cena e permite iniciar novamente.
- A aplicação pode ser utilizada por teclado e continua compreensível com movimento reduzido.
- A interface continua utilizável em telas estreitas.

## 12. Documentos relacionados

- [Proposta de arquitetura](../Achitecture.md)
- [Regras de negócio](../Buiseness_rules.md)
- [Stack tecnológico](../stck.md)
- [README do repositório](../README.md)
- [Versão Word desta documentação](Documentacao_do_Projeto.docx)
