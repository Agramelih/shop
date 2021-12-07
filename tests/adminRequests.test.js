import { adminLogin, createAdmin } from '../requests/adminRequests'

describe("Admin requests", () => {
    test("Create admin", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue( 
            {
                json: () => { return {name: "newAdmin"} }
            }
        );
        const answer = await createAdmin( {} );
        const shouldBe = {name: "newAdmin"};
        expect(answer).toEqual(shouldBe);
    } )

    test("Negative create admin", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false);
        const answer = await createAdmin();
        expect(answer).toEqual(false);
    } )

    test("Login admin", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue( 
            {
                json: () => { return {name: "newAdmin"} }
            }
        );
        const answer = await adminLogin( {} );
        const shouldBe = {name: "newAdmin"};
        expect(answer).toEqual(shouldBe);
    })

    test("Negative login admin", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false);
        const answer = await adminLogin( {} );
        expect(answer).toEqual(false);
    })
} )