import { describe, expect, it } from 'vitest';
import { transition, type ExperienceState } from './experience';

describe('experience transitions', () => {
  it('runs through the complete rain sequence and can restart', () => {
    let state: ExperienceState = 'ready';

    state = transition(state, 'start');
    expect(state).toBe('cloud-moving');

    state = transition(state, 'cloud-arrived');
    expect(state).toBe('raining');

    state = transition(state, 'rain-finished');
    expect(state).toBe('extinguished');

    state = transition(state, 'reset');
    expect(state).toBe('ready');
  });

  it('ignores events that are invalid for the current state', () => {
    expect(transition('ready', 'rain-finished')).toBe('ready');
    expect(transition('cloud-moving', 'reset')).toBe('cloud-moving');
    expect(transition('extinguished', 'start')).toBe('extinguished');
  });
});
