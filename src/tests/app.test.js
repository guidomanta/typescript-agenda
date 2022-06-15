const request = require("supertest");
const app = 'http://localhost:3000';

describe("GET /users", () => {
    test("Testing users list. Should return 200.", async () => {
        const response = await request(app).get("/users/list")
            expect(response.statusCode).toBe(200);
    });
});
describe("POST /users", () => {
    test("Testing users creation. Should return 201 as new user has been created.", async () => {
        const response = await request(app).post("/users/create").send({
            firstName: 'Giuseppe',
            lastName: 'Verdi',
            phone: '1234567',
            email: 'giuseppe@ver.di'
        })
        expect(response.statusCode).toBe(201);
    });
    test("Testing users creation. Should return 400 as new user fields are missing.", async () => {
        const response = await request(app).post("/users/create").send({
            firstName: 'Mario',
            lastName: 'Rossi'
        })
        expect(response.status).toBe(400);
    });
});

describe("POST /appointments", () => {
    beforeEach(async () => {
        //Get single user before every test is executed.
        const user = await request(app).get("/users/user");
        //Get ID to use in each test
        user_id = user.body._id;
    });
    test("Testing appointments creation. Should return 201 as new appointment has been created.", async () => {
        const response = await request(app).post("/appointments/create").send({
            userId: user_id,
            startDate: '2022-06-12T14:00:00Z',
            endDate: '2022-06-12T15:00:00Z'
        })
        expect(response.statusCode).toBe(201);
    });

    test("Testing appointments creation. Should return 400 as appointment already existing in time-span.", async () => {
        const response = await request(app).post("/appointments/create").send({
            userId: user_id,
            startDate: '2022-06-12T14:30:00Z',
            endDate: '2022-06-12T15:30:00Z'
        })
        expect(response.statusCode).toBe(400);
    });

    test("Testing user creation. Should return 201 as new appointment has been created.", async () => {
        const response = await request(app).post("/appointments/create").send({
            userId: user_id,
            startDate: '2022-06-25T16:30:00Z',
            endDate: '2022-06-25T17:30:00Z'
        })
        expect(response.statusCode).toBe(201);
    });
});