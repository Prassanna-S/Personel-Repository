import CommonObjects from "../pageObjects/CommonObjects";
import 'cypress-iframe'

export default class CommonMethods {

    items_in_cart = [];

    //This method is used to launch the application URL
    launch() {
       return cy.visit(CommonObjects.url)
    }

    //This is used to add the items in the cart based on the category
    add_item_to_cart(){
        cy.get(CommonObjects.heading).then(heading => {
            if(heading.text().includes('Moisturizers')){
                cy.wrap(this.add_cheapest_item('Aloe')).then( item => {
                   this.add_cheapest_item('Almond')
               })
            }else{
                cy.wrap(this.add_cheapest_item('SPF-50')).then( item => {
                    this.add_cheapest_item('SPF-30')
                })
            }
        })
    }

    //This method will decide the cheapest item per given variance and will add it to the cart
    add_cheapest_item(name: string){
        let min_price = 10000, item_id
        cy.get(CommonObjects.item).each((item,index,list)=> {
            if(item.text().toLowerCase().includes(name.toLowerCase())){
                let price = item.children('p').text()
                price = price.slice(price.length-3,price.length)
                if(min_price >= parseInt(price)) {
                    min_price = parseInt(price)
                    item_id = index
                }
            }
            if(index === (list.length - 1)) {
                cy.wrap(list[item_id]).find(CommonObjects.item_name).invoke('text').then(name => {
                    this.items_in_cart.push(name)
                })
                return cy.wrap(list[item_id]).find(CommonObjects.add_button).click()
            }
        })
    }

    //This is check if the added items in the cart matches with what is displayed in the checkout page
    check_added_items(){
        cy.get('tbody').should(items => {
            expect(items[0]).to.contain.text(this.items_in_cart[0])
            expect(items[0]).to.contain.text(this.items_in_cart[1])
        })
    }

    //This method is to click a button for any action
    click_on_button(button: string){
        return cy.get(button).click()
    }


    //The below method is to fill the payment details
    fill_payment_info(){
        cy.wait(1000)
        this.type_in_iframe(CommonObjects.email,"abc@gmail.com")
        this.type_in_iframe(CommonObjects.card,"4000056655665556")
        this.type_in_iframe(CommonObjects.exp,"05/2030")
        this.type_in_iframe(CommonObjects.csv,"123")
        this.type_in_iframe(CommonObjects.zip,"19005")
        cy.frameLoaded(CommonObjects.iframe).then(() => {
            return cy.iframe().find(CommonObjects.pay_button).click()
        })
    }

    //The below code is to type data inthe iframe during payemnt
    type_in_iframe(selector: string, value: string){
        cy.frameLoaded(CommonObjects.iframe).then(() => {
            return cy.iframe().find(selector).type(value)
        })
    }

    //To check if the payment is successful
    verify_successful_payment(){
        return cy.wait(3000).get(CommonObjects.heading).should('contain','PAYMENT SUCCESS')
    }

    //Select the category based on the temeperature
    choose_to_buy(){
        cy.get(CommonObjects.temperature).then( temp  => {
           if(Number(temp.text().slice(0,-2)) >= 34){
            return cy.get(CommonObjects.buy_sunscreen).click()
           }
           else
               cy.get(CommonObjects.buy_moisturiser).click()
        });
    }
}




