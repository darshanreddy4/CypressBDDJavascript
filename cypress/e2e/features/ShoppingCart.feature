Feature: Add Item to Cart
    @demo1
    Scenario: Add Item to Cart
        Given a user visits the login page
        When they enter "valid" credentials and click on login
        And they should be "redirected_to" the "product_inventory" page
        And they click "Add_to_Cart" for 2 products
        Then the cart icon should update with the item count of 2

    @demo1
    Scenario: Cart Page Verification
        Given a user visits the login page
        When they enter "valid" credentials and click on login
        And they should be "redirected_to" the "product_inventory" page
        And they click "Add_to_Cart" for 2 products
        And they navigate to "cart" page
        Then the correct items quantities and prices should be displayed
        
    @demo1
    Scenario: Remove Item from Cart
        Given a user visits the login page
        When they enter "valid" credentials and click on login
        And they should be "redirected_to" the "product_inventory" page
        And they click "Add_to_Cart" for 2 products
        And they navigate to "cart" page
        And they click "remove" for 1 products
        Then the item should no longer appear in the cart and the count should be updated