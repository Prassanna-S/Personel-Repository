import CommonMethods  from '../../../src/java/Methods/CommonMethods'
import CommonObjects from "../../../src/java/pageObjects/CommonObjects";
let commonMethods = new CommonMethods();

describe('Home Page Verification (Smoke,E2E)', () => {
    before(() => {
        commonMethods.launch();
    })

    beforeEach(() => {

    })


    it('Weather shopper E2E Test Case (E2)', () => {
        commonMethods.choose_to_buy();
        commonMethods.add_item_to_cart();
        commonMethods.click_on_button(CommonObjects.view_cart);
        commonMethods.check_added_items();
        commonMethods.click_on_button(CommonObjects.pay_with_card);
        commonMethods.fill_payment_info();
        commonMethods.verify_successful_payment();
    })

})