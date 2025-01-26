Feature: User Authentication
  @demo1
  Scenario: Successful Login
    Given a user visits the login page
    When they enter "valid" credentials and click on login
    Then they should be "redirected_to" the "product_inventory" page

  @demo1
  Scenario: Invalid Login
    Given a user visits the login page
    When they enter "Invalid" credentials and click on login
    Then they should be "on" the "login" page

  @demo1
  Scenario: Locked Out User
    Given a user visits the login page
    When they enter "locked_out_user" credentials and click on login
    Then they should be "on" the "login" page
