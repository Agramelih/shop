import { 
    createNewProductRequest,
    getArrayOfProductsRequest,
    deleteProductRequest,
    searchProduct,
    updateProductRequest
} from '../requests/productRequests'

describe("Test products requests", () => {
    test("Create product", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue( 
            { 
                json: () => { return {model: "nokia"} } 
            } 
        )
        const answer = await createNewProductRequest( {model: "nokia"} );
        const shouldBe = { model: "nokia" };
        expect(answer).toEqual(shouldBe)
    } )

    test("Negative create product", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false)
        const answer = await createNewProductRequest();
        expect(answer).toEqual(false)
    } )

    test("Get array of products", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue( 
            { 
                json: () => { return  [ {model: "nokia"}, {model: "xiaomi"} ] } 
            } 
        )
        const answer = await getArrayOfProductsRequest( "phone", 1, 2);
        const shouldBe = [ {model: "nokia"}, {model: "xiaomi"} ];
        expect(answer).toEqual(shouldBe);
    })

    test("Negative get array of products", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false);
        const answer = await getArrayOfProductsRequest();
        expect(answer).toEqual(false);
    })

    test("Delete product", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(
            {
                text: () => "deleted"
            }
        )
        const answer = await deleteProductRequest( { productId: "1" } );
        const shouldBe = "deleted";
        expect(answer).toEqual(shouldBe);
    })

    test("Negative delete product", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false);
        const answer = await deleteProductRequest();
        expect(answer).toEqual(false);
    })

    test("Search product", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue( 
            { 
                json: () => { return {model: "nokia"} } 
            } 
        )
        const answer =  await searchProduct( {productId: '1' } );
        const shouldBe = {model: "nokia"} ;
        expect(answer).toEqual(shouldBe);
    })

    test("Negative search product", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false)
        const answer =  await searchProduct();
        expect(answer).toEqual(false);
    })

    test("Update product", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(
            {
                json: () => { return {model: "nokia"} } 
            }
        )
        const answer = await updateProductRequest( { model: "xiaomi", newModel: "nokia"} ); 
        const shouldBe = {model: "nokia"} ;
        expect(answer).toEqual(shouldBe);
    } )

    test("Negative update product", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false)
        const answer = await updateProductRequest();
        expect(answer).toEqual(false);
    } )
})