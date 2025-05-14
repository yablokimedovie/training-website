import 'reflect-metadata';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import { Graywolf } from '../src/models/graywolf';
import { container } from '../src/config/container';
import { TYPES } from '../src/types/types';
import { IDatabase } from '../src/interfaces/IDatabase';
import { MONGODB_URI } from '../src/config/env';
import mongoose from 'mongoose';

const { expect } = chai;
chai.use(chaiHttp);

// Тести API вебдодатку сайту про Сірих вовків
describe('API вебдодатку сайту про Сірих вовків', () => {
    // Отримуємо екземпляр бази даних з контейнера
    const database = container.get<IDatabase>(TYPES.IDatabase);
    // Створюємо спеціальний URI для тестової бази даних
    const testMongoURI = MONGODB_URI.replace(/\/[^/]*$/, '/graywolfs-test');

    // Перед запуском тестів підключаємось до тестової бази даних
    before(async () => {
        await database.connect(testMongoURI);
        console.log('Підключено до тестової бази даних:', testMongoURI);
    });

    // Після всіх тестів очищуємо базу даних і відключаємося
    after(async () => {
        try {
            // Видаляємо тестову базу даних
            await mongoose.connection.db.dropDatabase();
            console.log('Тестову базу даних "graywolfs-test" успішно видалено');
        } catch (error) {
            // Обробляємо можливі помилки
            console.log(
                'Помилка видалення тестової бази даних:',
                error instanceof Error ? error.message : 'Невідома помилка',
            );
        } finally {
            // В будь-якому разі відключаємося від бази даних
            await database.disconnect();
            console.log('Відключено від тестової бази даних');
        }
    });

    // Тести для перевірки підключення до бази даних
    describe('Підключення до бази даних', () => {
        it('має перевірити підключення до тестової бази даних', () => {
            expect(database.isConnected()).to.be.true;
            expect(database.getConnectionUri()).to.equal(testMongoURI);
            console.log('Підключення до бази даних успішно перевірено');
        });
    });

    // Перед кожним тестом очищуємо колекцію Сірих вовків
    beforeEach(async () => {
        await Graywolf.deleteMany({});
    });

    // Тести для створення запису про нового Сірого вовка (POST-запит)
    describe('POST /api/graywolfs', () => {
        it('має створити запис про нового Сірого вовка', done => {
            // Тестові дані Сірого вовка
            const graywolf = {
                name: 'Сірий',
                age: 2,
                height: 30,
                weight: 2.5,
                gender: 'male' as const,
                description: 'Сірий вовк',
                herdSize: '10 особин',
            };

            // Виконуємо POST-запит для створення запису про Сірого вовка
            chai.request(app)
                .post('/api/graywolfs')
                .send(graywolf)
                .end((err, res) => {
                    if (err !== null && err !== undefined) {
                        return done(err);
                    }
                    // Перевіряємо відповідь
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('name', graywolf.name);
                    expect(res.body).to.have.property('age', graywolf.age);
                    expect(res.body).to.have.property('height', graywolf.height);
                    expect(res.body).to.have.property('weight', graywolf.weight);
                    expect(res.body).to.have.property('gender', graywolf.gender);
                    expect(res.body).to.have.property('description', graywolf.description);
                    expect(res.body).to.have.property('dateAdded');
                    expect(res.body).to.have.property('herdSize', graywolf.herdSize);
                    expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
                    done();
                });
        });
    });

    // Тести для отримання всіх записів Сірих вовків (GET-запит)
    describe('GET /api/graywolfs', () => {
        it('має отримати всіх Сірих вовків', async () => {
            // Створюємо тестовий запис Сірого вовка
            const testGraywolf = new Graywolf({
                name: 'Вовчик',
                age: 3,
                height: 35,
                weight: 3.2,
                gender: 'male',
                description: 'Гарний Сірий вовк',
                herdSize: '10 особин',
            });
            await testGraywolf.save();

            // Виконуємо GET-запит для отримання всіх записів Сірих вовків
            const res = await chai.request(app).get('/api/graywolfs');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            expect(res.body[0]).to.have.property('name', 'Вовчик');
            expect(res.body[0]).to.have.property('gender', 'male');
            expect(res.body[0]).to.have.property('description', 'Гарний Сірий вовк');
            expect(res.body[0]).to.have.property('dateAdded');
            expect(res.body[0]).to.have.property('herdSize', '10 особин');
            expect(new Date(res.body[0].dateAdded)).to.be.instanceOf(Date);
        });
    });

    // Тести для отримання запису конкретного Сірого вовка за ID (GET-запит)
    describe('GET /api/graywolfs/:id', () => {
        it('має отримати конкретного Сірого вовка за id', async () => {
            // Створюємо запис тестового Сірого вовка
            const testGraywolf = new Graywolf({
                name: 'Сіряк',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Злий Сірий вовк',
                herdSize: '10 особин',
            });
            const savedGraywolf = await testGraywolf.save();

            // Виконуємо GET-запит для отримання запису Сірого вовка за ID
            const res = await chai.request(app).get(`/api/graywolfs/${String(savedGraywolf._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Сіряк');
            expect(res.body).to.have.property('age', 1);
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Злий Сірий вовк');
            expect(res.body).to.have.property('herdSize', '10 особин');
        });

        it('має повернути 404 для неіснуючого Сірого вовка', async () => {
            // Виконуємо GET-запит для неіснуючого ID Сірого вовка
            const res = await chai.request(app).get('/api/graywolfs/654321654321654321654321');
            expect(res).to.have.status(404);
        });
    });

    // Тести для повного оновлення запису про Сірого вовка (PUT-запит)
    describe('PUT /api/graywolfs/:id', () => {
        it('має повністю оновити запис про Сірого вовка', async () => {
            // Створюємо тестового Сірого вовка
            const testGraywolf = new Graywolf({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                herdSize: '10 особин',
            });
            const savedGraywolf = await testGraywolf.save();

            // Дані для оновлення Сірого вовка
            const updatedData = {
                name: 'Оновлений',
                age: 2,
                height: 30,
                weight: 2.5,
                gender: 'female',
                description: 'Оновлений опис',
                herdSize: '20 особин',
            };

            // Виконуємо PUT-запит для повного оновлення запису про Сірого вовка
            const res = await chai
                .request(app)
                .put(`/api/graywolfs/${String(savedGraywolf._id)}`)
                .send(updatedData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 2);
            expect(res.body).to.have.property('height', 30);
            expect(res.body).to.have.property('weight', 2.5);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(res.body).to.have.property('herdSize', '20 особин');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it("має завершитися невдачею при відсутності обов'язкових полів", async () => {
            // Створюємо тестового Сірого вовка
            const testGraywolf = new Graywolf({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                herdSize: '10 особин',
            });
            const savedGraywolf = await testGraywolf.save();

            // Неповні дані для оновлення (відсутні обов'язкові поля)
            const incompleteData = {
                name: 'Оновлений',
                age: 2,
                // height і weight відсутні
                gender: 'female',
                description: 'Оновлений опис',
                herdSize: '10 особин',
            };

            // Виконуємо PUT-запит з неповними даними
            const res = await chai
                .request(app)
                .put(`/api/graywolfs/${String(savedGraywolf._id)}`)
                .send(incompleteData);

            // Перевіряємо, що запит завершився з помилкою
            expect(res).to.have.status(400);

            // Перевіряємо, що Сірий вовк не змінився
            const unchangedGraywolf = await Graywolf.findById(savedGraywolf._id);
            expect(unchangedGraywolf).to.have.property('name', 'Оригінальний');
            expect(unchangedGraywolf).to.have.property('height', 25);
            expect(unchangedGraywolf).to.have.property('weight', 1.8);
            expect(unchangedGraywolf).to.have.property('herdSize', '10 особин');
        });
    });

    // Тести для часткового оновлення запису про Сірого вовка (PATCH-запит)
    describe('PATCH /api/graywolfs/:id', () => {
        it('має частково оновити запис про Сірого вовка', async () => {
            // Створюємо тестового Сірого вовка
            const testGraywolf = new Graywolf({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                herdSize: '10 особин',
            });
            const savedGraywolf = await testGraywolf.save();

            // Дані для часткового оновлення
            const patchData = {
                name: 'Частково оновлений',
                age: 3,
                description: 'Оновлений опис',
                herdSize: '20 особин',
            };

            // Виконуємо PATCH-запит
            const res = await chai
                .request(app)
                .patch(`/api/graywolfs/${String(savedGraywolf._id)}`)
                .send(patchData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Частково оновлений');
            expect(res.body).to.have.property('age', 3);
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('gender', 'male');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('dateAdded');
            expect(res.body).to.have.property('herdSize', '20 особин');
            expect(new Date(res.body.dateAdded)).to.be.instanceOf(Date);
        });

        it('демонструє різницю між PATCH і PUT з частковими оновленнями', async () => {
            // Створюємо тестового Сірого вовка
            const testGraywolf = new Graywolf({
                name: 'Оригінальний',
                age: 1,
                height: 25,
                weight: 1.8,
                gender: 'male',
                description: 'Початковий опис',
                erdSize: '10 особин',
            });
            const savedGraywolf = await testGraywolf.save();

            // Ті самі неповні дані, що не спрацювали з PUT, мають працювати з PATCH
            const partialData = {
                name: 'Оновлений',
                age: 2,
                // height і weight навмисно відсутні
                gender: 'female',
                description: 'Оновлений опис',
                erdSize: '10 особин',
            };

            // Виконуємо PATCH-запит
            const res = await chai
                .request(app)
                .patch(`/api/graywolfs/${String(savedGraywolf._id)}`)
                .send(partialData);

            // Перевіряємо результат
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('name', 'Оновлений');
            expect(res.body).to.have.property('age', 2);
            // Ці поля мають зберегти свої початкові значення
            expect(res.body).to.have.property('height', 25);
            expect(res.body).to.have.property('weight', 1.8);
            expect(res.body).to.have.property('gender', 'female');
            expect(res.body).to.have.property('description', 'Оновлений опис');
            expect(res.body).to.have.property('erdSize', '10 особин');
        });
    });

    // Тести для отримання метаданих (HEAD-запит)
    describe('HEAD /api/graywolfs', () => {
        it('має повернути заголовки метаданих', async () => {
            // Виконуємо HEAD-запит
            const res = await chai
                .request(app)
                .head('/api/graywolfs')
                .set('Accept', 'application/json');

            // Перевіряємо статус відповіді
            expect(res).to.have.status(200);

            // Виводимо отримані заголовки
            console.log('Заголовки:');
            console.log('-----------------');
            Object.entries(res.headers).forEach(([key, value]) => {
                console.log(`${key}: ${String(value)}`);
            });

            // Перевіряємо наявність необхідних заголовків
            expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
            expect(res.headers['x-powered-by']).to.equal('Express');
            expect(res.headers['content-length']).to.equal('2');
        });
    });

    // Тести для видалення запису Сірого вовка (DELETE-запит)
    describe('DELETE /api/graywolfs/:id', () => {
        it('має видалити запис про Сірого вовка', async () => {
            // Створюємо тестового Сірого вовка
            const testGraywolf = new Graywolf({
                name: 'Лапа',
                age: 2,
                height: 28,
                weight: 2.1,
                gender: 'female',
                description: 'Велика Сіра вовчиця',
                erdSize: '10 особин',
            });
            const savedGraywolf = await testGraywolf.save();

            // Виконуємо DELETE-запит
            const res = await chai
                .request(app)
                .delete(`/api/graywolfs/${String(savedGraywolf._id)}`);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Запис про Сірого вовка видалено');

            // Перевіряємо, що запис про Сірого вовка дійсно видалено з бази
            const findGraywolf = await Graywolf.findById(savedGraywolf._id);
            expect(findGraywolf).to.be.null;
        });
    });
});
