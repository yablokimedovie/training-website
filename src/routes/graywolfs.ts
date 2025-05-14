import { Router, Request, Response } from 'express';
import { container } from '../config/container';
import { GraywolfRepository } from '../repositories/GraywolfRepository';

// Створюємо новий обробник HTTP-запитів Express
const router = Router();
// Отримуємо екземпляр репозиторію Сірих вовків з контейнера інверсії залежностей
const graywolfRepository = container.get(GraywolfRepository);

// Обробка HTTP-запиту GET / - отримання всіх записів Сірих вовків
router.get('/', (async (_req: Request, res: Response) => {
    try {
        // Отримуємо всі записи Сірих вовків з бази даних через репозиторій
        const graywolfs = await graywolfRepository.findAll();
        res.json(graywolfs);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту GET /:id - отримання запису одного Сірого вовка за ідентифікатором
router.get('/:id', (async (req: Request, res: Response) => {
    try {
        // Пошук Сірого вовка за ідентифікатором
        const graywolf = await graywolfRepository.findById(req.params.id);
        if (graywolf) {
            res.json(graywolf);
        } else {
            // Якщо Сірий вовк не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис Сірого вовка не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту POST / - створення нового запису Сірого вовка
router.post('/', (async (req: Request, res: Response) => {
    try {
        // Створюємо новий запис Сірого вовка з даних запиту
        const newGraywolf = await graywolfRepository.create(req.body);
        // Повертаємо статус 201 (Created) і дані створеного Сірого вовка
        res.status(201).json(newGraywolf);
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PUT /:id - повне оновлення запису Сірого вовка
router.put('/:id', (async (req: Request, res: Response) => {
    try {
        // Перевірка наявності всіх обов'язкових полів для PUT запиту
        const requiredFields = ['name', 'age', 'height', 'weight', 'gender'];
        const missingFields = requiredFields.filter(field => !(field in req.body));

        // Якщо є відсутні поля, повертаємо помилку 400 Bad Request
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Відсутні обов'язкові поля: ${missingFields.join(', ')}`,
            });
        }

        // Оновлюємо Сірого вовка з вказаним ID
        const graywolf = await graywolfRepository.update(req.params.id, req.body);
        if (graywolf) {
            return res.json(graywolf);
        } else {
            // Якщо Сірий вовк не знайдений, повертаємо 404 помилку
            return res.status(404).json({ message: 'Запис Сірого вовка не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        return res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту PATCH /:id - часткове оновлення запису Сірого вовка
router.patch('/:id', (async (req: Request, res: Response) => {
    try {
        // Часткове оновлення запису Сірого вовка - передаються лише ті поля, які потрібно змінити
        const graywolf = await graywolfRepository.patch(req.params.id, req.body);
        if (graywolf) {
            res.json(graywolf);
        } else {
            // Якщо Сірий вовк не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис Сірого вовка не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(400).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

// Обробка HTTP-запиту DELETE /:id - видалення запису Сірого вовка
router.delete('/:id', (async (req: Request, res: Response) => {
    try {
        // Видаляємо дані про Сірого вовка за ID
        const graywolf = await graywolfRepository.delete(req.params.id);
        if (graywolf) {
            // У разі успіху повертаємо повідомлення про видалення
            res.json({ message: 'Запис про Сірого вовка видалено' });
        } else {
            // Якщо Сірий вовк не знайдений, повертаємо 404 помилку
            res.status(404).json({ message: 'Запис про Сірого вовка не знайдено' });
        }
    } catch (error) {
        // Обробка помилки
        const errorMessage = error instanceof Error ? error.message : 'Виникла невідома помилка';
        res.status(500).json({ message: errorMessage });
    }
}) as unknown as (req: Request, res: Response) => void);

export default router;
