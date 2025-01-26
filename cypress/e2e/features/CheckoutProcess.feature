Feature: Checkout Process
@demo1
Scenario: Successful Checkout
        Given a user visits the login page
        When they enter "valid" credentials and click on login
        And they should be "redirected_to" the "product_inventory" page
        And they click "Add_to_Cart" for 2 products
        And the cart icon should update with the item count of 2
        And they navigate to "cart" page
        And the correct items quantities and prices should be displayed
        And they do checkout for the items in cart
        And they "filled" user infomation
        And the correct items quantities and prices should be displayed
        Then they should see a confirmation page after placing the order
        
@demo1
Scenario: Missing Checkout Information
        Given a user visits the login page
        When they enter "valid" credentials and click on login
        And they should be "redirected_to" the "product_inventory" page
        And they click "Add_to_Cart" for 2 products
        And the cart icon should update with the item count of 2
        And they navigate to "cart" page
        And the correct items quantities and prices should be displayed
        And they do checkout for the items in cart
        And they "not_filled" user infomation
        Then an error message should be displayed

   