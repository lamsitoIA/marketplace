import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "Latin American Market API",
      version: "1.0.0",
      description: "API para el manejo de usuarios y products",
    },
    servers: [
      {
        url: "https://marketplace-backend-vex0.onrender.com/api/v1", 
      },
    ],
  },
  apis: ["config/routes/docs/*.yaml"], 
}; 

const specs = swaggerJsdoc(options); 

export default (app) => {
  app.use(
    "/api/v1/docs", 
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCssUrl:
        "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css", 
    })
  );
};