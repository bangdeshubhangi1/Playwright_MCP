import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { DataProvider } from '../../utils/DataReader';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL ?? Routes.BASE_URL;
const CART_ID = Number(process.env.CART_ID ?? 1);
const USER_ID = Number(process.env.USER_ID ?? 1);
const LIMIT = Number(process.env.LIMIT ?? 3);
const START_DATE = process.env.START_DATE ?? '2019-12-10';
const END_DATE = process.env.END_DATE ?? '2020-10-10';

test.describe('FakeStore Carts API Tests', () => {
  test('GET - All carts @master @sanity @api', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}${Routes.GET_ALL_CARTS}`);
    expect(response.status(), 'Getting all carts should return HTTP 200').toBe(200);

    const carts = await response.json();
    expect(Array.isArray(carts), 'The carts response should be an array').toBeTruthy();
    expect(carts.length, 'The API should return at least one cart').toBeGreaterThan(0);
  });

  test('GET - Cart by ID @master @sanity @api', async ({ request }) => {
    const route = Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID));
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Getting a valid cart should return HTTP 200').toBe(200);

    const cart = await response.json();
    expect(cart.id, 'The returned cart ID should match the requested ID').toBe(CART_ID);
    expect(cart.userId).toEqual(expect.any(Number));
    expect(Array.isArray(cart.products), 'A cart should contain a products array').toBeTruthy();
  });

  test('GET - Carts by date range @master @regression @api', async ({ request }) => {
    const route = Routes.GET_CARTS_BY_DATE_RANGE
      .replace('{startdate}', encodeURIComponent(START_DATE))
      .replace('{enddate}', encodeURIComponent(END_DATE));
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Filtering carts by date should return HTTP 200').toBe(200);

    const carts = await response.json();
    expect(Array.isArray(carts), 'The date-filtered carts response should be an array').toBeTruthy();
    const startTime = Date.parse(START_DATE);
    const endTime = Date.parse(END_DATE);
    expect(
      carts.every((cart: { date: string }) => {
        const cartTime = Date.parse(cart.date);
        return cartTime >= startTime && cartTime <= endTime;
      }),
      'Every returned cart date should fall within the requested range',
    ).toBeTruthy();
  });

  test('GET - Carts by user @master @regression @api', async ({ request }) => {
    const route = Routes.GET_USER_CART.replace('{userId}', String(USER_ID));
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Getting a user cart should return HTTP 200').toBe(200);

    const carts = await response.json();
    expect(Array.isArray(carts), 'The user carts response should be an array').toBeTruthy();
    expect(carts.every((cart: { userId: number }) => cart.userId === USER_ID)).toBeTruthy();
  });

  test('GET - Carts with limit @master @regression @api', async ({ request }) => {
    const route = Routes.GET_CARTS_WITH_LIMIT.replace('{limit}', String(LIMIT));
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'The limited cart request should return HTTP 200').toBe(200);

    const carts = await response.json();
    expect(Array.isArray(carts), 'The limited carts response should be an array').toBeTruthy();
    expect(carts.length, 'The response should contain the requested number of carts').toBe(LIMIT);
  });

  test('GET - Carts sorted ascending @master @regression @api', async ({ request }) => {
    const route = Routes.GET_CARTS_SORTED.replace('{order}', 'asc');
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Ascending cart sorting should return HTTP 200').toBe(200);

    const carts = await response.json();
    const cartIds = carts.map((cart: { id: number }) => cart.id);
    expect(cartIds, 'Cart IDs should be in ascending order').toEqual(
      [...cartIds].sort((firstId: number, secondId: number) => firstId - secondId),
    );
  });

  test('GET - Carts sorted descending @master @regression @api', async ({ request }) => {
    const route = Routes.GET_CARTS_SORTED.replace('{order}', 'desc');
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Descending cart sorting should return HTTP 200').toBe(200);

    const carts = await response.json();
    const cartIds = carts.map((cart: { id: number }) => cart.id);
    expect(cartIds, 'Cart IDs should be in descending order').toEqual(
      [...cartIds].sort((firstId: number, secondId: number) => secondId - firstId),
    );
  });

  test('POST - Create cart @master @regression @api', async ({ request }) => {
    const payload = RandomDataUtil.generateCartPayload(USER_ID);
    const response = await request.post(`${API_BASE_URL}${Routes.CREATE_CART}`, { data: payload });
    expect(response.status(), 'Creating a cart should return HTTP 201').toBe(201);

    const createdCart = await response.json();
    expect(createdCart.id, 'The created cart should have an ID').toEqual(expect.any(Number));
    expect(createdCart.userId).toBe(payload.userId);
    expect(createdCart.products).toEqual(payload.products);
  });

  test('PUT - Update cart quantity @master @regression @api', async ({ request }) => {
    const existingRoute = Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID));
    const existingResponse = await request.get(`${API_BASE_URL}${existingRoute}`);
    expect(existingResponse.status(), 'A valid cart should be available before updating it').toBe(200);

    const existingCart = await existingResponse.json();
    const payload = RandomDataUtil.generateUpdatedCartPayload(existingCart.userId);
    payload.date = existingCart.date;
    payload.products = existingCart.products.map((product: { productId: number; quantity: number }) => ({
      productId: product.productId,
      quantity: product.quantity + 1,
    }));

    const updateRoute = Routes.UPDATE_CART.replace('{id}', String(CART_ID));
    const response = await request.put(`${API_BASE_URL}${updateRoute}`, { data: payload });
    expect(response.status(), 'Updating a cart should return HTTP 200').toBe(200);

    const updatedCart = await response.json();
    expect(updatedCart.id, 'The response should identify the updated cart').toBe(CART_ID);
    expect(updatedCart.products).toEqual(payload.products);
    expect(updatedCart.products[0].quantity).toBe(existingCart.products[0].quantity + 1);
  });

  test('DELETE - Cart @master @regression @api', async ({ request }) => {
    const route = Routes.DELETE_CART.replace('{id}', String(CART_ID));
    const response = await request.delete(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Deleting a cart should return HTTP 200').toBe(200);

    const deletedCart = await response.json();
    expect(deletedCart.id, 'The deleted cart response should identify the requested cart').toBe(CART_ID);
  });

  test('GET - Cart response schema @master @regression @api', async ({ request }) => {
    const route = Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID));
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Retrieving a cart for schema validation should return HTTP 200').toBe(200);

    const cart = await response.json();
    const schema = DataProvider.readJson('api/schemas/cart_api_schema.json');
    const validator = new Ajv().compile(schema);
    const isValid = validator(cart);
    expect(isValid, `Cart response did not match its schema: ${new Ajv().errorsText(validator.errors)}`).toBeTruthy();
  });

  test('WORKFLOW - Cart create, update, delete @master @regression @api', async ({ request }) => {
    const createPayload = RandomDataUtil.generateCartPayload(USER_ID);
    const createResponse = await request.post(`${API_BASE_URL}${Routes.CREATE_CART}`, { data: createPayload });
    expect(createResponse.status(), 'The workflow should create a cart with HTTP 201').toBe(201);

    const createdCart = await createResponse.json();
    const cartId = createdCart.id as number;
    expect(cartId, 'The create response should provide the ID used by later workflow steps').toEqual(expect.any(Number));
    expect(createdCart.userId).toBe(USER_ID);
    expect(createdCart.products).toEqual(createPayload.products);

    const updatePayload = RandomDataUtil.generateUpdatedCartPayload(USER_ID);
    updatePayload.products = createdCart.products.map((product: { productId: number; quantity: number }) => ({
      productId: product.productId,
      quantity: product.quantity + 1,
    }));
    const updateRoute = Routes.UPDATE_CART.replace('{id}', String(cartId));
    const updateResponse = await request.put(`${API_BASE_URL}${updateRoute}`, { data: updatePayload });
    expect(updateResponse.status(), 'The workflow should update the created cart with HTTP 200').toBe(200);

    const updatedCart = await updateResponse.json();
    expect(updatedCart.id).toBe(cartId);
    expect(updatedCart.products).toEqual(updatePayload.products);

    const deleteRoute = Routes.DELETE_CART.replace('{id}', String(cartId));
    const deleteResponse = await request.delete(`${API_BASE_URL}${deleteRoute}`);
    expect(deleteResponse.status(), 'The workflow should delete the same cart with HTTP 200').toBe(200);
    expect((await deleteResponse.json()).id).toBe(cartId);
  });
});
