import { describe, it, expect } from 'vitest';
import { validateTravelPlan } from './travelPlanValidation';

describe('validateTravelPlan', () => {
  it('rejects non-positive days and travelers', () => {
    const { errors } = validateTravelPlan({ days: 0, travelers: 0 });
    expect(errors.days).toBeTruthy();
    expect(errors.travelers).toBeTruthy();
  });

  it('accepts valid minimal payload', () => {
    const { errors } = validateTravelPlan({ days: 3, travelers: 1, travelStyle: 'moderate' });
    expect(Object.keys(errors).length).toBe(0);
  });
});
