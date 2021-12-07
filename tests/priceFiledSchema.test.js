import priceFiledSchema from '../schemes/priceFieldSchema'

describe( "Test price field schema", () => {
    test("Positive test", async() => {
        try {
            const isValid = await priceFiledSchema.validate( { price: 200 } )
            expect(isValid).toEqual( { price: 200 } )
        } catch (error) {
            console.log(error.message)
        }
    })

    test("Negative test min value price field", async() => {
        try {
            const isValid = await priceFiledSchema.validate( { price: 0 } )
            expect( isValid ).toBe( "price must be greater than or equal to 1" )
        } catch (error) {
            expect( error.message ).toBe( "price must be greater than or equal to 1" )
        }
    })

    test("Negative test max value price field", async() => {
        try {
            const isValid = await priceFiledSchema.validate( { price: 10001 } )
            expect( isValid ).toBe( "price must be less than or equal to 10000" )
        } catch (error) {
            expect( error.message ).toBe( "price must be less than or equal to 10000" )
        }
    })
} )