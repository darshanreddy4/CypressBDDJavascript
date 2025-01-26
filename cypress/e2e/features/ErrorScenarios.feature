Feature: Error Scenarios

  @demo1
  Scenario: Attempting Actions Without Login
    Given a user visits the login page
    When they attempt to navigate to a "product_inventory" page without login
    Then they should be "redirected_to" the "login" page