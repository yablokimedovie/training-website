import { injectable } from 'inversify';
import { Graywolf, IGraywolf } from '../models/graywolf';

// Клас-репозиторій для роботи з зайцями
// Анотація injectable дозволяє впровадити цей репозиторій через IoC контейнер
@injectable()
export class GraywolfRepository {
    // Метод для отримання всіх зайців з бази даних
    public async findAll(): Promise<IGraywolf[]> {
        return Graywolf.find();
    }

    // Метод для пошуку зайця за унікальним ідентифікатором
    public async findById(id: string): Promise<IGraywolf | null> {
        return Graywolf.findById(id);
    }

    // Метод для створення нового зайця в базі даних
    public async create(graywolfData: IGraywolf): Promise<IGraywolf> {
        const graywolf = new Graywolf(graywolfData);
        return graywolf.save();
    }

    // Метод для видалення зайця за ідентифікатором
    public async delete(id: string): Promise<boolean> {
        const result = await Graywolf.findByIdAndDelete(id);
        return result !== null;
    }

    // Метод для повного оновлення даних про зайця (заміна всіх полів)
    public async update(id: string, graywolfData: IGraywolf): Promise<IGraywolf | null> {
        return Graywolf.findByIdAndUpdate(id, graywolfData, { new: true });
    }

    // Метод для часткового оновлення даних про зайця (оновлення лише вказаних полів)
    public async patch(id: string, graywolfData: Partial<IGraywolf>): Promise<IGraywolf | null> {
        return Graywolf.findByIdAndUpdate(id, { $set: graywolfData }, { new: true });
    }
}
