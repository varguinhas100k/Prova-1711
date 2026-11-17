# Stack tecnológico — Nuvem que apaga o fogo

## Objetivo

Definir as tecnologias para implementar a experiência web descrita em `Achitecture.md`: ao acionar um controle, uma nuvem se move sobre o fogo, começa a chover e as chamas se apagam.

## Stack recomendado para o MVP

| Camada | Tecnologia | Uso |
|---|---|---|
| Estrutura da interface | HTML5 semântico | Cenário, controles e mensagens acessíveis. |
| Lógica da experiência | TypeScript | Estados da interação, eventos e coordenação da sequência. |
| Estilo e animações | CSS3 | Layout responsivo, transições e animações da nuvem, chuva e fogo. |
| Ilustrações | SVG | Desenhos leves e escaláveis para os elementos do cenário. |
| Desenvolvimento e build | Vite + Node.js + npm | Servidor local de desenvolvimento e geração dos arquivos estáticos para publicação. |
| Testes unitários | Vitest | Verificação das transições de estado e das regras da experiência. |
| Controle de qualidade | ESLint + Prettier | Identificação de problemas comuns e padronização do código. |

## Escolhas e justificativas

- **TypeScript sem framework de interface:** a aplicação tem uma única experiência, poucos estados e não precisa de componentes complexos. TypeScript ajuda a manter explícitas as transições sem adicionar o peso de um framework.
- **CSS e SVG para animação:** atendem aos movimentos e ilustrações do MVP sem dependências gráficas adicionais. As animações devem respeitar `prefers-reduced-motion`.
- **Vite para desenvolvimento:** oferece recarga rápida durante a implementação e produz arquivos estáticos que podem ser servidos por hospedagem web comum.
- **Sem backend no MVP:** a interação ocorre no navegador e não exige contas, persistência ou troca de dados com um servidor.

## Organização sugerida

```text
web/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
	├── main.ts              # inicialização e eventos da interface
	├── experience.ts        # estados e sequência da experiência
	├── experience.test.ts   # testes das transições
	└── styles.css
```

As ilustrações SVG do cenário são incorporadas em `index.html` para que os estilos possam animá-las diretamente. Manter a lógica de estado em `experience.ts` separada da manipulação da interface facilita testar o comportamento sem depender de animações ou do navegador.

## Execução e publicação

- Entrar na pasta `web/` e instalar dependências com `npm install`.
- Executar o servidor local com `npm run dev`.
- Executar os testes de transição com `npm test`.
- Gerar a versão de publicação com `npm run build`; os arquivos em `web/dist/` podem ser hospedados como conteúdo estático.

## Fora do escopo inicial

Não incluir banco de dados, API, autenticação, framework frontend ou serviço de hospedagem específico. Se futuramente houver placares compartilhados, conteúdo remoto ou progresso persistente, avaliar uma API separada e integrar sua necessidade sem acoplar o fluxo de animação a ela.

## Compatibilidade com o projeto atual

A solução existente está configurada como um aplicativo de console .NET, enquanto este stack descreve uma interface web. A implementação deverá ser criada como frontend web separado ou o projeto deverá ser adaptado para servir a aplicação web. Para o MVP, a opção mais simples é começar com o frontend estático em TypeScript/Vite, sem adicionar uma API .NET que não seja necessária.