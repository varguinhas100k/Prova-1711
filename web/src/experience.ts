export type ExperienceState = 'ready' | 'cloud-moving' | 'raining' | 'extinguished';
export type ExperienceEvent = 'start' | 'cloud-arrived' | 'rain-finished' | 'reset';

const transitions: Record<ExperienceState, Partial<Record<ExperienceEvent, ExperienceState>>> = {
  ready: { start: 'cloud-moving' },
  'cloud-moving': { 'cloud-arrived': 'raining' },
  raining: { 'rain-finished': 'extinguished' },
  extinguished: { reset: 'ready' },
};

export function transition(state: ExperienceState, event: ExperienceEvent): ExperienceState {
  return transitions[state][event] ?? state;
}
