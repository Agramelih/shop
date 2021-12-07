import passwordFieldSchema from '../schemes/passwordFieldSchema'

describe( "Test password field schema", () => {
    test("Positive test", async() => {
        try {
            const isValid = await passwordFieldSchema.validate({password: "qweasdzxc"});
            expect(isValid).toEqual({password: "qweasdzxc"});
        } catch (error) {
            console.log(error.message)
        }
        
    })

    test("Test empty password field", async() => {
        try {
            const isValid = await passwordFieldSchema.validate({})
            expect(error.message).toBe("password is a required field")
        } catch (error) {
            expect(error.message).toBe("password is a required field")
        }
    })
} )