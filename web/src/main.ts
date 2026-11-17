import './styles.css';
import { transition, type ExperienceEvent, type ExperienceState } from './experience';

function requireElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Não foi possível iniciar a experiência: ${selector} não foi encontrado.`);
  return element;
}

const rainButton = requireElement<HTMLButtonElement>('#rain-button');
const rainLabel = requireElement<HTMLElement>('#rain-label');
const resetButton = requireElement<HTMLButtonElement>('#reset-button');
const statusMessage = requireElement<HTMLElement>('#status-message');
const actionTitle = requireElement<HTMLElement>('#action-title');

let state: ExperienceState = 'ready';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const copy: Record<ExperienceState, { title: string; status: string; button: string }> = {
  ready: {
    title: 'Vamos ajudar?',
    status: 'Toque no botão e veja a mágica acontecer.',
    button: 'Chamar a chuva',
  },
  'cloud-moving': {
    title: 'Uma ajudinha está chegando!',
    status: 'Olha só! A nuvem já está a caminho.',
    button: 'Chamando a nuvem…',
  },
  raining: {
    title: 'Chuvinha boa!',
    status: 'Cada gotinha ajuda o fogo a descansar.',
    button: 'Chovendo…',
  },
  extinguished: {
    title: 'Conseguimos!',
    status: 'Fogo apagado! O vale está seguro e verdinho.',
    button: 'Missão cumprida!',
  },
};

function setState(event: ExperienceEvent): void {
  state = transition(state, event);
  document.body.dataset.experienceState = state;
  actionTitle.textContent = copy[state].title;
  statusMessage.textContent = copy[state].status;
  rainLabel.textContent = copy[state].button;
  rainButton.disabled = state !== 'ready';
  resetButton.disabled = state !== 'extinguished';
}

function wait(duration: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, reducedMotion.matches ? 100 : duration));
}

rainButton.addEventListener('click', async () => {
  if (state !== 'ready') return;

  setState('start');
  await wait(1000);
  setState('cloud-arrived');
  await wait(2200);
  setState('rain-finished');
});

resetButton.addEventListener('click', () => {
  if (state === 'extinguished') setState('reset');
});

document.body.dataset.experienceState = state;
