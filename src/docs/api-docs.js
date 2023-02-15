const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Blogs Api",
        version: "1.0.0",
        description: "Blogs, Messages and User apis",
        contact: {
          name: "Lambert Bayiringire", 
          email: "lambertbayiringire@gmail.com", 
          url: "web.com",
        },
      },
      servers: [
        {
          url: 'http://localhost:3000/',
          description: 'Local Server',
        }
      ],
      components: {
        // securitySchemes: {
        //   bearerAuth: {
        //     type: "http",
        //     scheme: "bearer",
        //     bearerFormat: "JWT",
        //   },
        // },
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ['src/routes/*.js'],
  }
  export default options