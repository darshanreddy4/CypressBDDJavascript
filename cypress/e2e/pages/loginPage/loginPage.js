import login_Page from "./loginpage_obj";

class LoginPage {
  
    visit(url) {
      cy.visit(url);
      cy.url().should('eq', url);
    }
  
    checkElementsVisible() {
      [login_Page.loginButton, login_Page.usernameField, login_Page.passwordField].forEach(selector => {
        cy.get(selector).should('be.visible');
      });
    }

    userLogin(value){
      if (value === "valid") {
        cy.get(login_Page.usernameField).type("standard_user");
        cy.get(login_Page.passwordField).type("secret_sauce");
        cy.get(login_Page.loginButton).click();
    
      } else if (value === "locked_out_user") {
        cy.get(login_Page.usernameField).type("locked_out_user");
        cy.get(login_Page.passwordField).type("secret_sauce");
        cy.get(login_Page.loginButton).click();
        cy.get('h3').should('have.text', 'Epic sadface: Sorry, this user has been locked out.');
    
      }
      else {
        cy.get(login_Page.usernameField).type("invalidUser");
        cy.get(login_Page.passwordField).type("invalidPassword");
        cy.get(login_Page.loginButton).click();
        // cy.get("input").should("have.attr", "placeholder", "Search the web without being tracked");
        // cy.contains("Invalid username or password").should("be.visible"); 
        cy.get('h3').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    
      }
    }

    navigateToPage(pageto){
      if (pageto === "product_inventory") {
        cy.visit("https://www.saucedemo.com/inventory.html", { failOnStatusCode: false });
        cy.url().should('eq', 'https://www.saucedemo.com/');
        [login_Page.loginButton, login_Page.passwordField, login_Page.usernameField].forEach(selector => {
          cy.get(selector).should('be.visible');
        });
        cy.get('h3').should('have.text', "Epic sadface: You can only access '/inventory.html' when you are logged in.");
    
      }
      else {
        cy.get('h3').should('have.text', "Epic sadface: You can only access '/inventory.html' when you are logged in.");
    
      }

    }

  }
  
  export default new LoginPage();
  