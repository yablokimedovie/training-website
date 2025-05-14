// Експорт специфікації Swagger/OpenAPI для документації про API
export const swaggerSpec = {
    // Версія специфікації OpenAPI
    openapi: '3.0.0',
    // Загальна інформація про API
    info: {
        title: 'API Сайту про Сірих вовків',
        version: '1.0.0',
        description: 'Документація API для Сайту про Сірих вовків',
    },
    // Налаштування серверів для тестування API
    servers: [
        {
            url:
                process.env.CODESPACE_NAME !== undefined
                    ? `https://${process.env.CODESPACE_NAME}-5000.app.github.dev`
                    : 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    // Визначення кінцевих точок (endpoints) REST API та операцій з ними
    paths: {
        '/api/graywolfs': {
            // GET запит для отримання всіх Сірих вовків
            get: {
                summary: 'Отримати всіх Сірих вовків',
                responses: {
                    '200': {
                        description: 'Список всіх Сірих вовків',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Graywolf' },
                                },
                            },
                        },
                    },
                },
            },

            // POST запит для створення нового Сірого вовка
            post: {
                summary: 'Створити нового Сірого вовка',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Graywolf' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: "Створений об'єкт Сірого вовка",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Graywolf' },
                            },
                        },
                    },
                },
            },
        },

        // Операції для конкретного Сірого вовка за ID
        '/api/graywolfs/{id}': {
            // GET запит для отримання Сірого вовка за ID
            get: {
                summary: 'Отримати Сірого вовка за ID',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID Сірого вовка',
                    },
                ],
                responses: {
                    '200': {
                        description: "Об'єкт Сірого вовка",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Graywolf' },
                            },
                        },
                    },
                    '404': { description: 'Сірого вовка не знайдено' },
                },
            },

            // PUT запит для повного оновлення Сірого вовка за ID
            put: {
                summary: 'Повністю оновити Сірого вовка',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID Сірого вовка',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Graywolf' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт Сірого вовка",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Graywolf' },
                            },
                        },
                    },
                    '404': { description: 'Сірого вовка не знайдено' },
                },
            },
            // PATCH запит для часткового оновлення Сірого вовка за ID
            patch: {
                summary: 'Частково оновити Сірого вовка',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID Сірого вовка',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Graywolf' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: "Оновлений об'єкт Сірого вовка",
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Graywolf' },
                            },
                        },
                    },
                    '404': { description: 'Сірого вовка не знайдено' },
                },
            },
            // DELETE запит для видалення даних про Сірого вовка за ID
            delete: {
                summary: 'Видалити дані про Сірого вовка',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: { type: 'string' },
                        description: 'ID Сірого вовка',
                    },
                ],
                responses: {
                    '200': { description: 'Повідомлення про успішне видалення' },
                    '404': { description: 'Сірого вовка не знайдено' },
                },
            },
        },
    },

    // Визначення компонентів для повторного використання
    components: {
        // Схеми даних
        schemas: {
            // Схема об'єкта Сірий вовк
            Graywolf: {
                type: 'object',
                required: ['name', 'age', 'height', 'weight', 'gender'],
                properties: {
                    name: {
                        type: 'string',
                        description: "Ім'я Сірого вовка",
                    },
                    age: {
                        type: 'number',
                        description: 'Вік Сірого вовка у роках',
                    },
                    height: {
                        type: 'number',
                        description: 'Висота Сірого вовка в сантиметрах',
                    },
                    weight: {
                        type: 'number',
                        description: 'Вага Сірого вовка в кілограмах',
                    },
                    gender: {
                        type: 'string',
                        enum: ['male', 'female'],
                        description: 'Стать Сірого вовка',
                    },
                    description: {
                        type: 'string',
                        description: "Опис Сірого вовка (необов'язкове поле)",
                    },
                },
            },
        },
    },
};
