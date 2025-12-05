import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options= {
    swaggerDefinition: {
        openapi: '3.1.1',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/router.ts']
}
const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://parspng.com/wp-content/uploads/2023/01/catpng.parspng.com_.png');
            height: auto;
            max-width: 80px !important; 
        }
        .swagger-ui .topbar {
            background-color: oklch(0.56 0.15 251.07);
        }
    `
}

export default swaggerSpec;
export {
    swaggerUiOptions
};