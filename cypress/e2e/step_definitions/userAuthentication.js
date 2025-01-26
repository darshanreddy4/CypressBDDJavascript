import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginPage from "../pages/loginPage/loginPage";

const url = "https://www.saucedemo.com/"

When("a user visits the login page", () => {
  loginPage.visit(url);
  loginPage.checkElementsVisible();
});

When("they enter {string} credentials and click on login", (value) => {
  loginPage.userLogin(value);
});

When("they attempt to navigate to a {string} page without login", (pageto) => {
  loginPage.navigateToPage(pageto);
});

Then("they should be {string} the {string} page", (on_page, page) => {
  if (page === "product_inventory") {
    cy.url().should('include', "inventory.html");
    cy.get(':nth-child(1) > [data-test="inventory-item-description"]')
  } else if (page === "login") {
    cy.url().should('include', url);
    ['#login-button', '#password', '#user-name'].forEach(selector => {
      cy.get(selector).should('be.visible');
    });
  } else {
    cy.log("the defined page: " + page + " is not handled")

  }
});

Then("they click {string} for {int} products", (action, item_count) => {
  if (action === "Add_to_Cart") {
    cy.get('button[data-test^="add-to-cart"]').then((buttons) => {

      const buttonsCount = buttons.length;
      cy.log(`Number of "Add to cart" buttons: ${buttonsCount}`);

      expect(buttonsCount).to.be.greaterThan(1);
    });

    const selectedProducts = [];

    cy.get('button[data-test^="add-to-cart"]').each(($btn, index) => {
      if (index < item_count) {
        cy.wrap($btn).click();

        cy.get('button[data-test^="remove-"]').eq(index)
          .should('be.visible')
          .closest('.inventory_item_description')
          .should('exist')
          .find('.inventory_item_label > a > div')
          .invoke('text')
          .then((text) => {
            selectedProducts.push(text.trim());
          });
      }
    });
    cy.then(() => {
      cy.wrap(selectedProducts).as('selectedProducts')
      expect(selectedProducts).to.have.lengthOf(item_count);
      cy.log('Selected Products:', selectedProducts);
    });

  } else if (action === "remove") {
    let initialItemCount;

    cy.get('.cart_list')
      .find('.cart_item')
      .should('have.length.greaterThan', 0)
      .then((cartItems) => {
        initialItemCount = cartItems.length;
        cy.log(" the initial items in cart count is " + initialItemCount)

        cy.get('.cart_list')
          .find('.cart_item')
          .first()
          .find('button[data-test^="remove-"]')
          .click();

        cy.wrap(initialItemCount).as('initialItemCount')
      });


  }
  else {
    cy.log(` the specified ${action} is not handled`)
  }
});

Then("the item should no longer appear in the cart and the count should be updated", () => {

  cy.get('@initialItemCount').then((initialItemCount) => {
    cy.get('.cart_list')
      .find('.cart_item')
      .should('have.length', initialItemCount - 1);
  });
});

Then("they navigate to {string} page", (to_page) => {
  if (to_page === "cart") {
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', "cart.html");

  } else {
    cy.log("the page is not handled")
  }
});

Then("the correct items quantities and prices should be displayed", () => {

  cy.get('@selectedProducts').then((selectedProducts) => {
    cy.get('.cart_item').each(($el, index) => {

      cy.wrap($el)
        .find('.inventory_item_name')
        .invoke('text')
        .then((cartProductsName) => {
          expect(cartProductsName.trim()).to.equal(selectedProducts[index]);
        })
    })
  });

});

Then("all product names and images and prices should be displayed correctly", () => {
  cy.get('[data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]').should('be.visible');
  cy.get('.inventory_item_img > a > img').should('be.visible');
  cy.contains("Add to cart").should("be.visible");

});

Then("they select a sorting option as {string}", (sorting_order) => {
  cy.get(".product_sort_container").select(sorting_order)
});

Then("the cart icon should update with the item count of {int}", (added_item_count) => {
  cy.get('.shopping_cart_badge')
    .invoke('text')
    .then((cartProductscount) => {
      expect(parseFloat(cartProductscount.trim())).to.equal(added_item_count);
    })
});

Then("they do checkout for the items in cart", () => {
  cy.get("#checkout").click();
  cy.url().should('include', "checkout-step-one.html");
});

Then("they {string} user infomation", (userinfo) => {
  if (userinfo === "filled") {
    cy.get("#first-name").type('Darshan');
    cy.get("#last-name").type('Reddy');
    cy.get("#postal-code").type('12345');
    cy.get('#continue').click();
    cy.url().should('include', "checkout-step-two.html");
  } else {
    cy.get("#postal-code").type('12345');
    cy.get('#continue').click();
    cy.url().should('include', "checkout-step-one.html");
  }
});

Then("an error message should be displayed", () => {
  cy.get('.error-message-container>h3')
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.equal('Error: First Name is required');
    });

});

Then("they should see a confirmation page after placing the order", () => {
  cy.get('#finish').click();
  cy.url().should('include', "checkout-complete.html");
  cy.get('.complete-header')
    .invoke('text')
    .then((successfulorder) => {
      expect(successfulorder.trim()).to.equal("Thank you for your order!");
    })
  cy.get('.complete-text')
    .invoke('text')
    .then((successfulorder) => {
      expect(successfulorder.trim()).to.equal("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    })
  cy.get("#back-to-products").should('be.visible');

});

Then("the products should be sorted according to price in {string} order", (sorted_order) => {

  cy.get('.pricebar .inventory_item_price')
    .then($prices => {
      const prices = $prices.toArray().map(price => {
        const priceText = price.innerText.replace('$', '').trim();
        cy.log("the price is " + priceText)
        return parseFloat(priceText);
      });

      let sortedPrices;

      switch (sorted_order.toLowerCase()) {
        case 'low_to_high':
          sortedPrices = [...prices].sort((a, b) => a - b);
          break;
        case 'high_to_low':
          sortedPrices = [...prices].sort((a, b) => b - a);
          break;
        case 'featured':
          sortedPrices = [...prices];
          break;
        default:
          sortedPrices = [...prices];
          break;
      }
      expect(prices).to.have.length(sortedPrices.length);
      prices.forEach((price, index) => {
        expect(price).to.equal(sortedPrices[index]);
      });
    });


});