export default class CommonObjects {

    //Since it is a simple project, instead of one class per page, i am using common class for all the pages

    static url = 'https://weathershopper.pythonanywhere.com/'
    static view_cart = 'body > nav > ul > button'
    static pay_with_card = 'button > span'
    static heading = 'h2'
    static item = 'div[class="text-center col-4"]'
    static iframe = 'iframe.stripe_checkout_app'
    static temperature = '#temperature'
    static buy_sunscreen = 'div.text-center.col-4.offset-4 > a > button'
    static buy_moisturiser = 'div:nth-child(1) > a > button'
    static pay_button = '#submitButton > span > span'
    static item_name = 'p:nth-child(2)'
    static add_button = 'button'
    static email = '#email'
    static card = "#card_number"
    static exp = "#cc-exp"
    static csv = "#cc-csc"
    static zip = "#billing-zip"
}