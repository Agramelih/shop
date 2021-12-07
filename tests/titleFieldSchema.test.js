import titleFieldSchema from '../schemes/titleFieldSchema'

describe("Test title field schema", () => {
    test("Positive test", async() => {
        try {
            const isValid = await titleFieldSchema.validate( { title: 'phone'} );
            expect(isValid).toEqual( { title: 'phone' } );
        } catch (error) {
            console.log(error.message)
        }
    })

    test("Test empty title field", async() => {
        try {
            const isValid = await titleFieldSchema.validate( { } );
            expect(isValid).toBe( "title is a required field" );
        } catch (error) {
            expect(error.message).toBe("title is a required field")
        }
    })

    test("Test min length", async() => {
        try {
            const isValid = await titleFieldSchema.validate( { title: 'ph' } );
            expect(isValid).toBe( "title must be at least 3 characters" );
        } catch (error) {
            expect(error.message).toBe("title must be at least 3 characters")
        }
    })

    test("Test max length", async() => {
        try {
            const isValid = await titleFieldSchema.validate( { title: 'qwertyuiopasdfghjklzx' } );
            expect(isValid).toBe( "title must be at most 20 characters" );
        } catch (error) {
            expect(error.message).toBe("title must be at most 20 characters")
        }
    })

    test("Test only letters validation in title field", async() => {
        try {
            const isValid = await titleFieldSchema.validate( { title: 'ph0ne' } );
            expect(isValid).toBe( "title must contain only letters" );
        } catch (error) {
            expect(error.message).toBe("title must contain only letters")
        }
    } )
})