import registrationSchema from '../schemes/registrationSchema'

describe("Test registration schema", () => {
    test("Positive test", async() => {
        try {
            const isValid = await registrationSchema.validate( { login: "qwerty", password: "qweasdzxc"} );
            expect(isValid).toEqual({ login: "qwerty", password: "qweasdzxc"})
        } catch (error) {
            console.log(error.message)
        }
    })

    test("Test empty login field", async() => {
        try {
            const isValid = await registrationSchema.validate( {  password: "qweasdzxc"} );
            expect(error.message).toBe("login is a required field")
        } catch (error) {
            expect(error.message).toBe("login is a required field")
        }
    })

    test("Test empty password field", async() => {
        try {
            const isValid = await registrationSchema.validate( { login: "qwerty" } );
            expect(error.message).toBe("password is a required field")
        } catch (error) {
            expect(error.message).toBe("password is a required field")
        }
    })

    test("Test min login length", async() => {
        try {
            const isValid = await registrationSchema.validate( { login: "qw", password: "qweasdzxc"} );
            expect(error.message).toBe("login must be at least 3 characters")
        } catch (error) {
            expect(error.message).toBe("login must be at least 3 characters")
        }
    })

    test("Test min password length", async() => {
        try {
            const isValid = await registrationSchema.validate( { login: "qwerty", password: "qwe"} );
            expect(error.message).toBe("password must be at least 8 characters")
        } catch (error) {
            expect(error.message).toBe("password must be at least 8 characters")
        }
    })

    test("Test check only letters validation in login field", async() => {
        try {
            const isValid = await registrationSchema.validate( { login: "qwe12rty", password: "qweasdzxc"} );
            expect(error.message).toBe("login must contain only letters")
        } catch (error) {
            expect(error.message).toBe("login must contain only letters")
        }
    } )

    test("Test only letters validation in password field", async() => {
        try {
            const isValid = await registrationSchema.validate( { login: "qwerty", password: "qwe23asdzxc"} );
            expect(error.message).toBe("password must contain only letters")
        } catch (error) {
            expect(error.message).toBe("password must contain only letters")
        }
    } )
} )