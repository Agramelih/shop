import loginShema from '../schemes/loginSchema'

describe("Test login schema validation", () => {
    test("Positive test", async() => {
        try {
            const isValid = await loginShema.validate( { login: "qwe", password: "qweasdzxc" } );
            expect(isValid).toEqual( { login: "qwe", password: "qweasdzxc" } );
        } catch (error) {
            console.log(error.message)
        }
    })

    test("Test empty login field", async() => {
        try {
            const isValid = await loginShema.validate( { password: "qweasdzxc" } );
            expect(error.message).toBe("login is a required field")
        } catch (error) {
            expect(error.message).toBe("login is a required field")
        }
    })

    test("Test empty passord field", async() => {
        try {
            const isValid = await loginShema.validate( { login: "qwe" } );
            expect(error.message).toBe("password is a required field")
        } catch (error) {
            expect(error.message).toBe("password is a required field")
        }
    })
})