import createProductSchema from '../schemes/createProduct'

describe("Test create product validation schema", () => {
    test("Test valid example", async() => {
        try {
            const isValid = await createProductSchema.validate( {
                title: "nokia",
                price: 200,
                image: "phone.png"
            } )
            expect( isValid ).toEqual( {
                title: "nokia",
                price: 200,
                image: "phone.png"
            } )
        } catch (error) {
            console.log(error.message)
        }
        
    })

    test("Test empty title field", async() => {
        try {
            const isValid = await createProductSchema.validate( {
                price: 200,
                image: "phone.png"
            } )
            expect( isValid ).toBe( "title is a required field" )
        } catch (error) {
            expect( error.message ).toBe( "title is a required field" )
        }
    })

    test("Test empty price field", async() => {
        try {
            const isValid = await createProductSchema.validate( {
                title: "nokia",
                image: "phone.png"
            } )
            expect( isValid ).toBe( "price is a required field" )
        } catch (error) {
            expect( error.message ).toBe( "price is a required field" )
        }
    })

    test("Test empty image field", async() => {
        try {
            const isValid = await createProductSchema.validate( {
                title: "nokia",
                price: 200,
            } )
            expect( isValid ).toBe( "image is a required field" )
        } catch (error) {
            expect( error.message ).toBe( "image is a required field" )
        }
    })

    test("Negative test min length title field", async() => {
        try {
            const isValid = await createProductSchema.validate( {
                title: "te",
                price: 200,
                image: "phone.png"
            } )
            expect( isValid ).toBe( "title must be at least 3 characters" )
        } catch (error) {
            expect( error.message ).toBe( "title must be at least 3 characters" )
        }
    })

    test("Negative test min value price field", async() => {
        try {
            const isValid = await createProductSchema.validate( {
                title: "nokia",
                price: 0,
                image: "phone.png"
            } )
            expect( isValid ).toBe( "price must be greater than or equal to 1" )
        } catch (error) {
            expect( error.message ).toBe( "price must be greater than or equal to 1" )
        }
    })

    test("Negative test max value price field", async() => {
        try {
            const isValid = await createProductSchema.validate( {
                title: "nokia",
                price: 10001,
                image: "phone.png"
            } )
            expect( isValid ).toBe( "price must be less than or equal to 10000" )
        } catch (error) {
            expect( error.message ).toBe( "price must be less than or equal to 10000" )
        }
    })

    test("Negative test image value field", async() => {
        try {
            const isValid = await createProductSchema.validate( {
                title: "nokia",
                price: 200,
                image: "../assets/placeholder.png"
            } )
            expect( isValid ).toBe( "Image required" )
        } catch (error) {
            expect( error.message ).toBe( "Image required" )
        }
    })
})