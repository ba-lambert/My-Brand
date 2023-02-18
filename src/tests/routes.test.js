import request from 'supertest';
import app from '../app.js';
import path from 'path'
let token1 , userId ,blogId
jest.setTimeout(35000)
describe('authentication testing',()=>{
  test("should register a new user in database",async()=>{
    const res = await request(app).post('/api/v1/register').send({
      email : "umbereye322@email.com",
      password : "@Password"
    })
    userId = res.body.user._id
    console.log(userId);
    expect(res.statusCode).toBe(200)
  },25000)
  test("should sign in a user", async()=>{
    const res = await request(app).post('/api/v1/login').send({
      email : "umbereye122@email.com",
      password : "password"
    });
    // expect(res.statusCode).toBe(201);  
    // const response =  request(app).get('/api/v1/messages').set('Cookie',eddy)
    // expect(response.statusCode).toBe(200);
    token1 = res.body.token
    expect(res.statusCode).toBe(200); 
  })
  test('should get messages',async()=>{
    const res = await request(app).get('/api/v1/messages').set("Authorization", `Bearer ${token1}`)
    expect(res.statusCode).toBe(200);
  },25000)

//   describe('here comes getting a;; blogs',()=>{
//     test ('getting all blogs', async() =>{
//         const response = await request(app).get('/blogs').set({authorization:'bearer '+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGJjYjdiYmJlMzUxYjY4NzhiOWIzMyIsImlhdCI6MTY3NTQzMjUzOX0.GMMV3Uba3cm5jdmQl0ce4uq9ZMMhfSiqXU44yJ1_saQ"
//     });
//         expect(response.status).toBe(200)
//     })
// })
// test('should delete created user',async()=>{
//   const res = await request(app).delete(`/api/v1/users/${userId}`).set("Authorization", `Bearer ${token1}`)
//   expect(res.statusCode).toBe(200)
//   console.log(userId);
// })

},55000)

//testing blogs
describe('Blog end points testing',()=>{
  //get all blogs
  test('Should return all blogs', async () => {
    const response = await request(app).get('/api/v1/blogs');
    expect(response.statusCode).toBe(201);
  });

  //post new blog
  test('should return 200 status code on successfull api post',async()=>{
    const res = await request(app).post('/api/v1/blogs').field("author","authorauthorauthor")
    .field("blogContent","authorauthorauthorauthor")
    .field("blogTitle","authorauthorauthorauthorauthor")
    .attach("image", path.resolve(__dirname, "../assets/test_img.png")).set("Authorization", `Bearer ${token1}`)
    expect(res.statusCode).toBe(201);
    blogId = res.body._id
  },55000)

  //get single blog
  test('must return a single blog with a certain Id',async()=>{
    const id = 123323
    const res = await request(app).get(`/api/v1/blogs/${blogId}`);
    expect(res.statusCode).toBe(201);
    console.log(blogId);
  },250000)
  
})
describe('should test messages', ()=>{
  test('should get messages',async()=>{
    const res = await request(app).get('/api/v1/messages').set("Authorization", `Bearer ${token1}`)
    expect(res.statusCode).toBe(200);
  },25000)
  // test('should like a blog',async()=>{
  //   const res = await request(app).post('/api/v1/blogs/63e2340aa78b636d87300a9a/likes').set('Cookie',bT)
  //   expect(res.statusCode).toBe(200)
  // })
  test('should post a new commet',async()=>{
    const newComment = {
      comment:"my comment"
    }
    const res = await request(app).post(`/api/v1/blogs/${blogId}/comments`).set("Authorization", `Bearer ${token1}`).send(newComment)
    expect(res.statusCode).toBe(201)
  })
  //posting new message
  test('should post a new message',async()=>{
    const res=await request(app).post('/api/v1/messages').set("Authorization", `Bearer ${token1}`).send({
      userNames : "testUser test test test",
      email : "email@test.com",
      message: "my message must be greater than 10 characters"
  })
    expect(res.statusCode).toBe(404)
  })
  test('should like a blog',async()=>{
    const res =await request(app).post(`/api/v1/blogs/${blogId}/likes`).set("Authorization", `Bearer ${token1}`)
    expect(res.statusCode).toBe(200)
  })
  test('should delete a created blog',async()=>{
    const res = await request(app).delete(`/api/v1/blogs/${blogId}`).set("Authorization", `Bearer ${token1}`)
    expect(res.statusCode).toBe(201)
  })

  //logout user
  test("should logout a user",async()=>{
    const res = await request(app).get('/api/v1/logout');
    expect(res.statusCode).toBe(200)  
  },25000)

  test("Should delete a created user",async()=>{
    const res = await request(app).delete(`/api/v1/users/${userId}`).set("Authorization", `Bearer ${token1}`)
    expect(res.statusCode).toBe(200)
  })
})