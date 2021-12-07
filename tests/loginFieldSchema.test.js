import loginFieldSchema from '../schemes/loginFieldSchema'

describe("Test login filed schema validation", () => {
    test("Positive test", async() => {
        try {
            const isValid = await loginFieldSchema.validate( { login: "qwe" } );
            expect(isValid).toEqual( { login: "qwe" } );
        } catch (error) {
            console.log(error.message)
        }
    })

    test("Test empty login field", async() => {
        try {
            const isValid = await loginFieldSchema.validate( { } );
            expect(error.message).toBe("login is a required field")
        } catch (error) {
            expect(error.message).toBe("login is a required field")
        }
    })
})