import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import request from 'supertest';

// Simple express app for testing the router in isolation
async function makeApp() {
  const app = express();
  app.use(express.json());
  const travelPlanRoutes = (await import('../routes/travelPlanRoutes.js')).default;
  app.use('/api/travel-plan', travelPlanRoutes);
  return app;
}

// Mock global fetch for Gemini
const originalFetch = global.fetch;

describe('POST /api/travel-plan', () => {
  before(() => {
    // Ensure API key check passes in tests
    process.env.GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'test-key';
    global.fetch = async () => {
      // minimal fake Gemini response
      return new Response(JSON.stringify({
        candidates: [
          { content: { parts: [{ text: JSON.stringify({ overview: 'ok', days: [], costs: { perPerson: 0, total: 0, breakdown: [] }, accommodations: [], transport: [], packingList: [], links: [] }) }] } }
        ]
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    };
  });
  
  after(() => {
    global.fetch = originalFetch;
  });

  it('validates required numeric fields', async () => {
    const app = await makeApp();
    const res = await request(app)
      .post('/api/travel-plan')
      .send({ days: 0, travelers: -1 });

    assert.equal(res.statusCode, 400);
    assert.equal(res.body?.message, 'Validation failed');
    assert.ok(res.body?.errors?.days);
    assert.ok(res.body?.errors?.travelers);
  });

  it('returns ok with minimal valid payload', async () => {
    const app = await makeApp();
    const res = await request(app)
      .post('/api/travel-plan')
      .send({ days: 3, travelers: 2, destination: 'Kandy' });

    assert.equal(res.statusCode, 200);
    assert.equal(res.body?.ok, true);
    assert.ok(res.body?.plan);
  });
});
