import { 
    searchCategory, 
    createCategoryRequest, 
    deleteCategoryRequest, 
    getCategories, 
    updateCategoryRequest 
} from '../requests/categoryRequests'

describe("Category requests", () => {
    test("Search category", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(
            {
                json: () => { return [ "phone1", "phone2" ] }
            }
        );
        const answer = await searchCategory( { name: "phones"} );
        const shouldBe = [ "phone1", "phone2" ];
        expect(answer).toEqual(shouldBe);
    })

    test("Negative search category", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false);
        const answer = await searchCategory();
        expect(answer).toEqual(false);
    })

    test("Create category", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(
            {
                json: () => { return { name: "phones" } }
            }
        );
        const answer = await createCategoryRequest( { name: "phones"} );
        const shouldBe = { name: "phones" };
        expect(answer).toEqual(shouldBe)
    })

    test("Negative create category", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false);
        const answer = await createCategoryRequest();
        expect(answer).toEqual(false)
    })

    test("Category delete", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(
            {
                json: () => "deleted"
            }
        );
        const answer = await deleteCategoryRequest( {} )
        const shouldBe = "deleted";
        expect(answer).toEqual(shouldBe)
    } )

    test("Negative category delete", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false);
        const answer = await deleteCategoryRequest()
        expect(answer).toEqual(false)
    } )

    test("Get category", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(
            {
                json: () => { return { categoryId: "1"} }
            }
        );
        const answer = await getCategories();
        const shouldBe = { categoryId: "1"};
        expect(answer).toEqual(shouldBe)
    })

    test("Negative get category", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false);
        const answer = await getCategories();
        expect(answer).toEqual(false)
    })

    test("Update category", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(
            {
                json: () => { return { categoryId: "1"} }
            }
        );
        const answer = await updateCategoryRequest();
        const shouldBe = { categoryId: "1"};
        expect(answer).toEqual(shouldBe)
    })

    test("Negative update category", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false);
        const answer = await updateCategoryRequest();
        expect(answer).toEqual(false)
    })
})