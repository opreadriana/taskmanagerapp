import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// SCENARIO 1: View Homepage Content
Given("I am on the homepage", () => {
  cy.visit("/");
  // Wait for page to load
  cy.contains("Welcome to the Productivity App!").should("be.visible");
});

Then("I should see the productivity quotes", () => {
  cy.contains("You may delay, but time will not.").should("be.visible");
  cy.contains("Benjamin Franklin").should("be.visible");
  cy.contains("The way to get started is to quit talking and begin doing.").should("be.visible");
  cy.contains("Walt Disney").should("be.visible");
});

Then("I should see the {string} button", (buttonText: string) => {
  cy.contains("button", buttonText).should("be.visible");
});

Then("I should see the AI Assistant section", () => {
  cy.contains("AI Assistant").should("be.visible");
});

// SCENARIO 2: Navigate to To-Do Page
When("I click the {string} button", (buttonText: string) => {
  cy.contains("button", buttonText).click();
});

Then("I should be on the todo page", () => {
  cy.url().should("include", "/todo");
  cy.contains("Task Manager").should("be.visible");
});

// SCENARIO 3: Ask AI a Question
When("I type {string} in the AI input", (question: string) => {
  cy.get('textarea[placeholder*="Ask"]').clear().type(question);
});

When("I click the Ask AI button", () => {
  // Mock the API response to avoid real OpenAI calls, no cost no network delay, just consistent test results - write a fake message response
  cy.intercept("POST", "/api/ask-ai", {
    statusCode: 200,
    body: {
      choices: [
        {
          message: {
            content: "I recommend focusing on your highest priority tasks first. Break them into smaller steps and tackle them one at a time."
          }
        }
      ]
    }
  }).as("askAI");

  cy.contains("button", "Ask AI").click();
});

Then("I should see the AI response", () => {
  // Wait for the API call to complete
  cy.wait("@askAI");
  // Verify the mocked response appears
  cy.contains("I recommend focusing on your highest priority tasks").should("be.visible");
});
