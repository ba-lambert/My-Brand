import request from 'supertest';
import fs from 'path'
const mongoose = require("mongoose");
import app from '../app.js';
const token = ''
describe('Express API tests', () => {
  let server = app;
  it('Should return 200 status code on successful API call', async () => {
    const response = await request(server).get('/api/v1/blogs');
    expect(response.statusCode).toBe(201);
  });
});
describe('/api/v1/blog/:id',()=>{
  it('must return a single blog with a certain Id',async()=>{
    const id = 123323
    const res = await request(app).get('/api/v1/blogs/63e23042dd79a8b77e537bb2');
    expect(res.statusCode).toBe(201);
  },150000)
})
// describe ('Post a new blog',()=>{
//   let server = app;
//   const newBlog = {
//     author : "This is the auther for testing",
//     blogTitle : "This is the auther for testing",
//     blogContent : "This is the auther for testing",
//     image : "This is the auther for testing",
//   }
//   it('shou return 200 status code on successfull api post',async()=>{
//     const res = await request(app).post('/api/v1/blogs').send({author : "This is the auther for testing",
//     blogTitle : "This is the auther for testing",
//     blogContent : "This is the auther for testing",
//     image : "This is the auther for testing"});
//     expect(res.statusCode).toBe(201);
//   },15000)
// })
describe('should test messages', ()=>{
  it('should get messages',async()=>{
    const res = await request(app).get('/api/v1/messages');
    expect(res.statusCode).toBe(200);
  },15000)
})