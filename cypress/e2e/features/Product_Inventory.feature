Feature: Product Inventory
  @demo1
  Scenario: Product List Loads Correctly
    Given a user visits the login page
    When they enter "valid" credentials and click on login
    And they should be "redirected_to" the "product_inventory" page
    Then all product names and images and prices should be displayed correctly

  @demo1
  Scenario: Sort Products
    Given a user visits the login page
    When they enter "valid" credentials and click on login
    And they should be "redirected_to" the "product_inventory" page
    And they select a sorting option as "Price (low to high)"
    Then the products should be sorted according to price in "low_to_high" order