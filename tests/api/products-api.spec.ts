import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { DataProvider } from '../../utils/DataReader';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL ?? Routes.BASE_URL;
const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
const LIMIT = Number(process.env.LIMIT ?? 3);

test.describe('FakeStore Products API Tests', () => {
  test('GET - All products @master @sanity @api', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}${Routes.GET_ALL_PRODUCTS}`);
    expect(response.status(), 'Getting all products should return HTTP 200').toBe(200);

    const products = await response.json();
    expect(Array.isArray(products), 'The products response should be an array').toBeTruthy();
    expect(products.length, 'The API should return at least one product').toBeGreaterThan(0);
    expect(products[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      price: expect.any(Number),
      category: expect.any(String),
      image: expect.any(String),
    }));
  });

  test('GET - Product by ID @master @sanity @api', async ({ request }) => {
    const response = await request.get(
      `${API_BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID))}`,
    );
    expect(response.status(), 'Getting a valid product should return HTTP 200').toBe(200);

    const product = await response.json();
    expect(product.id, 'The returned product ID should match the requested ID').toBe(PRODUCT_ID);
    expect(product.title, 'The product should have a title').toEqual(expect.any(String));
    expect(product.price, 'The product price should be numeric').toEqual(expect.any(Number));
    expect(product.category, 'The product should have a category').toEqual(expect.any(String));
    expect(product.image, 'The product should have an image URL').toEqual(expect.any(String));
  });

  test('GET - Products with limit @master @regression @api', async ({ request }) => {
    const response = await request.get(
      `${API_BASE_URL}${Routes.GET_PRODUCTS_WITH_LIMIT.replace('{limit}', String(LIMIT))}`,
    );
    expect(response.status(), 'The limited product request should return HTTP 200').toBe(200);

    const products = await response.json();
    expect(Array.isArray(products), 'The limited products response should be an array').toBeTruthy();
    expect(products.length, 'The response should contain the requested number of products').toBe(LIMIT);
  });

  test('GET - Products sorted ascending @master @regression @api', async ({ request }) => {
    const route = Routes.GET_PRODUCTS_SORTED.replace('{order}', 'asc');
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Ascending product sorting should return HTTP 200').toBe(200);

    const products = await response.json();
    const productIds = products.map((product: { id: number }) => product.id);
    expect(productIds, 'Product IDs should be in ascending order').toEqual(
      [...productIds].sort((firstId: number, secondId: number) => firstId - secondId),
    );
  });

  test('GET - Products sorted descending @master @regression @api', async ({ request }) => {
    const route = Routes.GET_PRODUCTS_SORTED.replace('{order}', 'desc');
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Descending product sorting should return HTTP 200').toBe(200);

    const products = await response.json();
    const productIds = products.map((product: { id: number }) => product.id);
    expect(productIds, 'Product IDs should be in descending order').toEqual(
      [...productIds].sort((firstId: number, secondId: number) => secondId - firstId),
    );
  });

  test('GET - All product categories @master @regression @api', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}${Routes.GET_ALL_CATEGORIES}`);
    expect(response.status(), 'Getting product categories should return HTTP 200').toBe(200);

    const categories = await response.json();
    expect(Array.isArray(categories), 'The categories response should be an array').toBeTruthy();
    expect(categories.length, 'The API should return at least one category').toBeGreaterThan(0);
    expect(categories.every((category: string) => typeof category === 'string')).toBeTruthy();
  });

  test('GET - Products by category @master @regression @api', async ({ request }) => {
    const category = 'electronics';
    const route = Routes.GET_PRODUCTS_BY_CATEGORY.replace('{category}', category);
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Getting products by category should return HTTP 200').toBe(200);

    const products = await response.json();
    expect(Array.isArray(products), 'The category products response should be an array').toBeTruthy();
    expect(products.length, 'The category should contain at least one product').toBeGreaterThan(0);
    expect(products.every((product: { category: string }) => product.category === category)).toBeTruthy();
  });

  test('POST - Create product @master @regression @api', async ({ request }) => {
    const payload = RandomDataUtil.generateProductPayload();
    const response = await request.post(`${API_BASE_URL}${Routes.CREATE_PRODUCT}`, { data: payload });
    expect(response.status(), 'Creating a product should return HTTP 201').toBe(201);

    const createdProduct = await response.json();
    expect(createdProduct.id, 'The created product should have an ID').toEqual(expect.any(Number));
    expect(createdProduct.title).toBe(payload.title);
    expect(createdProduct.price).toBe(payload.price);
    expect(createdProduct.description).toBe(payload.description);
    expect(createdProduct.image).toBe(payload.image);
    expect(createdProduct.category).toBe(payload.category);
  });

  test('PUT - Update product @master @regression @api', async ({ request }) => {
    const payload = RandomDataUtil.generateUpdatedProductPayload();
    const route = Routes.UPDATE_PRODUCT.replace('{id}', String(PRODUCT_ID));
    const response = await request.put(`${API_BASE_URL}${route}`, { data: payload });
    expect(response.status(), 'Updating a product should return HTTP 200').toBe(200);

    const updatedProduct = await response.json();
    expect(updatedProduct.id, 'The response should identify the updated product').toBe(PRODUCT_ID);
    expect(updatedProduct.title).toBe(payload.title);
    expect(updatedProduct.price).toBe(payload.price);
    expect(updatedProduct.description).toBe(payload.description);
    expect(updatedProduct.image).toBe(payload.image);
    expect(updatedProduct.category).toBe(payload.category);
  });

  test('DELETE - Product @master @regression @api', async ({ request }) => {
    const route = Routes.DELETE_PRODUCT.replace('{id}', String(PRODUCT_ID));
    const response = await request.delete(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Deleting a product should return HTTP 200').toBe(200);

    const deletedProduct = await response.json();
    expect(deletedProduct.id, 'The deleted product response should identify the requested product').toBe(PRODUCT_ID);
  });

  test('GET - Product response schema @master @regression @api', async ({ request }) => {
    const route = Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID));
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Retrieving a product for schema validation should return HTTP 200').toBe(200);

    const product = await response.json();
    const schema = DataProvider.readJson('api/schemas/product_api_schema.json');
    const validator = new Ajv().compile(schema);
    const isValid = validator(product);
    expect(isValid, `Product response did not match its schema: ${new Ajv().errorsText(validator.errors)}`).toBeTruthy();
  });

  test('WORKFLOW - Product create, update, delete @master @regression @api', async ({ request }) => {
    const createPayload = RandomDataUtil.generateProductPayload();
    const createResponse = await request.post(`${API_BASE_URL}${Routes.CREATE_PRODUCT}`, { data: createPayload });
    expect(createResponse.status(), 'The workflow should create a product with HTTP 201').toBe(201);

    const createdProduct = await createResponse.json();
    const productId = createdProduct.id as number;
    expect(productId, 'The create response should provide the ID used by later workflow steps').toEqual(expect.any(Number));

    const updatePayload = RandomDataUtil.generateUpdatedProductPayload();
    const updateRoute = Routes.UPDATE_PRODUCT.replace('{id}', String(productId));
    const updateResponse = await request.put(`${API_BASE_URL}${updateRoute}`, { data: updatePayload });
    expect(updateResponse.status(), 'The workflow should update the created product with HTTP 200').toBe(200);

    const updatedProduct = await updateResponse.json();
    expect(updatedProduct.id).toBe(productId);
    expect(updatedProduct.title).toBe(updatePayload.title);
    expect(updatedProduct.price).toBe(updatePayload.price);

    const deleteRoute = Routes.DELETE_PRODUCT.replace('{id}', String(productId));
    const deleteResponse = await request.delete(`${API_BASE_URL}${deleteRoute}`);
    expect(deleteResponse.status(), 'The workflow should delete the same product with HTTP 200').toBe(200);
    expect((await deleteResponse.json()).id).toBe(productId);
  });
});
