import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { DataProvider } from '../../utils/DataReader';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL ?? Routes.BASE_URL;
const USER_ID = Number(process.env.USER_ID ?? 1);
const LIMIT = Number(process.env.LIMIT ?? 3);

test.describe('FakeStore Users API Tests', () => {
  test('GET - All users @master @sanity @api', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}${Routes.GET_ALL_USERS}`);
    expect(response.status(), 'Getting all users should return HTTP 200').toBe(200);

    const users = await response.json();
    expect(Array.isArray(users), 'The users response should be an array').toBeTruthy();
    expect(users.length, 'The API should return at least one user').toBeGreaterThan(0);
    expect(users[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      email: expect.any(String),
      username: expect.any(String),
      name: expect.any(Object),
    }));
  });

  test('GET - User by ID @master @sanity @api', async ({ request }) => {
    const route = Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID));
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Getting a valid user should return HTTP 200').toBe(200);

    const user = await response.json();
    expect(user.id, 'The returned user ID should match the requested ID').toBe(USER_ID);
    expect(user.email).toEqual(expect.any(String));
    expect(user.username).toEqual(expect.any(String));
    expect(user.name.firstname).toEqual(expect.any(String));
    expect(user.name.lastname).toEqual(expect.any(String));
  });

  test('GET - Users with limit @master @regression @api', async ({ request }) => {
    const route = Routes.GET_USERS_WITH_LIMIT.replace('{limit}', String(LIMIT));
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'The limited user request should return HTTP 200').toBe(200);

    const users = await response.json();
    expect(Array.isArray(users), 'The limited users response should be an array').toBeTruthy();
    expect(users.length, 'The response should contain the requested number of users').toBe(LIMIT);
  });

  test('GET - Users sorted ascending @master @regression @api', async ({ request }) => {
    const route = Routes.GET_USERS_SORTED.replace('{order}', 'asc');
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Ascending user sorting should return HTTP 200').toBe(200);

    const users = await response.json();
    const userIds = users.map((user: { id: number }) => user.id);
    expect(userIds, 'User IDs should be in ascending order').toEqual(
      [...userIds].sort((firstId: number, secondId: number) => firstId - secondId),
    );
  });

  test('GET - Users sorted descending @master @regression @api', async ({ request }) => {
    const route = Routes.GET_USERS_SORTED.replace('{order}', 'desc');
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Descending user sorting should return HTTP 200').toBe(200);

    const users = await response.json();
    const userIds = users.map((user: { id: number }) => user.id);
    expect(userIds, 'User IDs should be in descending order').toEqual(
      [...userIds].sort((firstId: number, secondId: number) => secondId - firstId),
    );
  });

  test('POST - Create user @master @regression @api', async ({ request }) => {
    const payload = RandomDataUtil.generateUserPayload();
    const response = await request.post(`${API_BASE_URL}${Routes.CREATE_USER}`, { data: payload });
    expect(response.status(), 'Creating a user should return HTTP 201').toBe(201);

    const createdUser = await response.json();
    expect(createdUser.id, 'The created user should have an ID').toEqual(expect.any(Number));
    expect(createdUser.email).toBe(payload.email);
    expect(createdUser.username).toBe(payload.username);
    expect(createdUser.name.firstname).toBe(payload.name.firstname);
    expect(createdUser.name.lastname).toBe(payload.name.lastname);
    expect(createdUser.phone).toBe(payload.phone);
  });

  test('PUT - Update user @master @regression @api', async ({ request }) => {
    const payload = RandomDataUtil.generateUserUpdatePayload();
    const route = Routes.UPDATE_USER.replace('{id}', String(USER_ID));
    const response = await request.put(`${API_BASE_URL}${route}`, { data: payload });
    expect(response.status(), 'Updating a user should return HTTP 200').toBe(200);

    const updatedUser = await response.json();
    expect(updatedUser.id, 'The response should identify the updated user').toBe(USER_ID);
    expect(updatedUser.email).toBe(payload.email);
    expect(updatedUser.username).toBe(payload.username);
    expect(updatedUser.name.firstname).toBe(payload.name.firstname);
    expect(updatedUser.name.lastname).toBe(payload.name.lastname);
  });

  test('DELETE - User @master @regression @api', async ({ request }) => {
    const route = Routes.DELETE_USER.replace('{id}', String(USER_ID));
    const response = await request.delete(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Deleting a user should return HTTP 200').toBe(200);

    const deletedUser = await response.json();
    expect(deletedUser.id, 'The deleted user response should identify the requested user').toBe(USER_ID);
  });

  test('GET - User response schema @master @regression @api', async ({ request }) => {
    const route = Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID));
    const response = await request.get(`${API_BASE_URL}${route}`);
    expect(response.status(), 'Retrieving a user for schema validation should return HTTP 200').toBe(200);

    const user = await response.json();
    const schema = DataProvider.readJson('api/schemas/user_api_schema.json');
    const validator = new Ajv().compile(schema);
    const isValid = validator(user);
    expect(isValid, `User response did not match its schema: ${new Ajv().errorsText(validator.errors)}`).toBeTruthy();
  });

  test('WORKFLOW - User create, update, delete @master @regression @api', async ({ request }) => {
    const createPayload = RandomDataUtil.generateUserPayload();
    const createResponse = await request.post(`${API_BASE_URL}${Routes.CREATE_USER}`, { data: createPayload });
    expect(createResponse.status(), 'The workflow should create a user with HTTP 201').toBe(201);

    const createdUser = await createResponse.json();
    const userId = createdUser.id as number;
    expect(userId, 'The create response should provide the ID used by later workflow steps').toEqual(expect.any(Number));

    const updatePayload = RandomDataUtil.generateUserUpdatePayload();
    const updateRoute = Routes.UPDATE_USER.replace('{id}', String(userId));
    const updateResponse = await request.put(`${API_BASE_URL}${updateRoute}`, { data: updatePayload });
    expect(updateResponse.status(), 'The workflow should update the created user with HTTP 200').toBe(200);

    const updatedUser = await updateResponse.json();
    expect(updatedUser.id).toBe(userId);
    expect(updatedUser.username).toBe(updatePayload.username);
    expect(updatedUser.email).toBe(updatePayload.email);

    const deleteRoute = Routes.DELETE_USER.replace('{id}', String(userId));
    const deleteResponse = await request.delete(`${API_BASE_URL}${deleteRoute}`);
    expect(deleteResponse.status(), 'The workflow should delete the same user with HTTP 200').toBe(200);
    expect((await deleteResponse.json()).id).toBe(userId);
  });
});
