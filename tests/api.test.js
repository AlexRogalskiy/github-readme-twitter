'use strict';

const { JSDOM } = require('jsdom');
const request = require('supertest');
const app = require('../src/app');

describe("Test /api", () => {
  test("should get the default query", async () => {
    const response = await request(app).get("/api?id=twitter");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('image/svg+xml');
  });

  test("should empty id parameter error", async () => {
    const response = await request(app).get("/api");

    expect(response.statusCode).toBe(400);
  });

  test("should get the wide layout", async () => {
    const response = await request(app).get("/api?id=twitter&layout=wide");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('image/svg+xml');
  });

  test("should the show_border option", async () => {
    const response = await request(app).get("/api?id=twitter&show_border=off");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('image/svg+xml');
    
    const document = new JSDOM(response.body.toString()).window.document;
    expect(document.getElementsByClassName('card-bg')[0]).toBe(undefined);
  });

  test("should the show_reply option", async () => {
    const response = await request(app).get("/api?id=twitter&show_reply=off");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('image/svg+xml');
  });

  test("should the show_retweet option", async () => {
    const response = await request(app).get("/api?id=twitter&show_retweet=off");
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('image/svg+xml');
  });
});
