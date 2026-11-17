# Regras de negócio — Chuva boa

## 1. Objetivo

A aplicação oferece uma experiência interativa e educativa: o usuário chama uma nuvem, a chuva reduz as chamas ilustradas no cenário e a experiência informa quando o fogo foi apagado.

## 2. Regras da experiência

### RN-01 — Estado inicial

Ao abrir ou reiniciar a aplicação, a experiência começa no estado **Pronto**: o fogo está aceso, a nuvem aguarda fora de sua posição sobre o fogo, a mensagem inicial é apresentada e o botão **Chamar a chuva** está habilitado.

### RN-02 — Início da ação

A sequência começa quando o usuário ativa **Chamar a chuva**. O botão deve poder ser acionado por clique ou por teclado. A aplicação desabilita o botão assim que a ação começa, impedindo que ativações repetidas criem sequências concorrentes.

### RN-03 — Ordem da sequência

A experiência deve respeitar esta ordem:

1. A nuvem se desloca para uma posição sobre o fogo.
2. A chuva começa quando a nuvem chega.
3. As chamas diminuem visualmente enquanto chove.
4. Ao fim da chuva, as chamas desaparecem e a experiência passa ao estado **Fogo apagado**.

### RN-04 — Conclusão

A aplicação só deve apresentar a missão como concluída depois que a etapa de chuva terminar e o fogo estiver visualmente apagado. A mensagem de conclusão deve ser textual e não depender apenas de cor, som ou animação.

### RN-05 — Recomeço

O controle **Recomeçar** fica disponível após a conclusão. Ao acioná-lo, a aplicação restaura o cenário inicial, a mensagem, a nuvem, o fogo e os controles, permitindo uma nova sequência.

### RN-06 — Ações fora de ordem

Eventos incompatíveis com o estado atual não alteram a experiência. Não é possível iniciar outra chuva enquanto a nuvem se move, enquanto chove ou depois que o fogo foi apagado. Não é possível recomeçar antes da conclusão.

### RN-07 — Movimento reduzido

Quando o usuário solicita movimento reduzido nas preferências do dispositivo, a aplicação encurta ou minimiza as animações, mas preserva a ordem da sequência, seus estados e a comunicação do resultado.

### RN-08 — Escopo e comunicação

O fogo e sua extinção são elementos de uma simulação ilustrativa. A aplicação não monitora incêndios reais, não contata serviços de emergência e não deve apresentar a interação como substituta de procedimentos de segurança ou resposta a emergências.

## 3. Estados permitidos

```text
PRONTO → NUVEM SE MOVENDO → CHOVENDO → FOGO APAGADO
   ↑                                          │
   └──────────────── RECOMEÇAR ───────────────┘
```

| Estado | Ação permitida | Resultado da transição |
|---|---|---|
| **Pronto** | Chamar a chuva | A nuvem começa a se mover. |
| **Nuvem se movendo** | Nenhuma nova ação | A chegada da nuvem inicia a chuva. |
| **Chovendo** | Nenhuma nova ação | O fim da chuva apaga as chamas. |
| **Fogo apagado** | Recomeçar | O cenário retorna ao estado inicial. |

## 4. Dados e persistência

A experiência não exige cadastro, identificação, placar, armazenamento ou envio de dados do usuário. Cada execução começa no estado inicial; o progresso não precisa persistir após recarregar ou fechar a página.

## 5. Critérios de aceite

- Um acionamento inicia uma única sequência na ordem definida.
- Ativações repetidas durante a sequência não duplicam animações nem alteram o resultado.
- A mensagem de conclusão só aparece depois que o fogo se apaga.
- Recomeçar restaura todos os elementos e permite executar a experiência novamente.
- A sequência permanece compreensível com movimento reduzido e pode ser iniciada por teclado.
- A aplicação deixa claro que a experiência é ilustrativa, sem sugerir que controla ou apaga incêndios reais.
