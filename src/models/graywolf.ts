import { Schema, model } from 'mongoose';

// Інтерфейс для об'єкта "Сірий вовк"
interface IGraywolf {
    name: string; // Ім'я Сірого вовка
    age: number; // Вік Сірого вовка у роках
    height: number; // Висота Сірого вовка в сантиметрах
    weight: number; // Вага Сірого вовка в кілограмах
    gender: 'male' | 'female'; // Стать Сірого вовка: 'male' - самець, 'female' - самка
    description?: string; // Опис Сірого вовка (необов'язкове поле)
    dateAdded: Date; // Дата додавання запису до бази даних
}

// Схема MongoDB для моделі "Сірий вовк"
const graywolfSchema = new Schema<IGraywolf>({
    name: {
        type: String,
        required: true, // Поле є обов'язковим
    },
    age: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    height: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    weight: {
        type: Number,
        required: true, // Поле є обов'язковим
    },
    gender: {
        type: String,
        required: true, // Поле є обов'язковим
        enum: ['male', 'female'], // Допустимі значення: 'male' або 'female'
    },
    description: String, // Необов'язкове текстове поле
    dateAdded: {
        type: Date,
        default: Date.now, // Значення за замовчуванням - поточна дата і час
    },
});

// Створення моделі Mongoose на основі схеми
export const Graywolf = model<IGraywolf>('Graywolf', graywolfSchema);
export type { IGraywolf }; // Експортуємо інтерфейс для використання в інших файлах
