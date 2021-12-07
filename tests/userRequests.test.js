import { regUser, getUserData, getUser, getUserByToken, purchase } from '../requests/userRequests'

describe( "User requests", () => {
    test('User create request', async() => {
        fetch = jest.fn();
        fetch.mockReturnValue( 
            {
                json: async() => true 
            }
            
        );
        const answer = await regUser({login: "qwe", password: "qweasdzxc"});
        expect( answer ).toBe( true );
    } )

    test('Negative user create request', async() => {
        fetch = jest.fn();
        fetch.mockReturnValue( 
            {
                json: async() => true 
            }
            
        );
        const answer = await regUser();
        expect( answer ).toBe( false );
    })

    test('Get user data', async() => {
        fetch = jest.fn();
        fetch.mockReturnValue( 
            {
                json: async() => {  return {login: 'qwerty'} }
            }
        ) ;
        const answer = await getUserData("token");
        const shouldBe = {login: 'qwerty' };
        expect(answer).toEqual( shouldBe );
    } ) 

    test('Negative get user data', async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false);
        const answer = await getUserData();
        expect(answer).toEqual(false);
    })

    test('Error get user data', async() => {
        fetch = jest.fn();
        fetch.mockReturnValue( 
            {
                json: async() => {  return {error: 'qwerty'} }
            }
        ) ;
        const answer = await getUserData("token");
        const shouldBe = false;
        expect(answer).toEqual( shouldBe );
    })

    test("Get user", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue( 
            {
                json: async() => {  return {login: 'qwerty'} }
            }
        );
        const answer = await getUser( { login: 'qwe', password: 'qweasdzxc'} );
        const shouldBe = {login: 'qwerty' };
        expect(answer).toEqual( shouldBe );
    } )

    test("Negative get user", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue( false );
        const answer = await getUser();
        expect(answer).toEqual( false );
    } )

    test("Get user by token", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue( 
            {
                json: async() => {  return {login: 'qwerty'} }
            }
        );
        const answer = await getUserByToken("qwerasdfzxcv", "token");
        const shouldBe = { login: "qwerty" }
        expect(answer).toEqual(shouldBe)
    })

    test("Negative get user by token", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(false);
        const answer = await getUserByToken();
        expect(answer).toEqual(false)
    })

    test("Test purchase", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(
            {
                text: () => "Success"
            }
        )
        const answer = await purchase([ {price: 200, amount: 2} ], "");
        expect(answer).toBe("Success")
    })

    test("Negative test purchase", async() => {
        fetch = jest.fn();
        fetch.mockReturnValue(
            {
                text: () => "Success"
            }
        )
        const answer = await purchase([], "");
        expect(answer).toBe(false)
    })
})