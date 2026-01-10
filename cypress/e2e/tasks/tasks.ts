import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the todo page", () => {
  cy.visit("/todo");
  // Wait for the page to fully load and the input to be ready
  cy.get('input[placeholder*="task"]').should("be.visible");
});

When("I enter {string} in the task input", (taskText: string) => {
  cy.get('input[placeholder*="task"]').clear().type(taskText);
});

When("I click the add button", () => {
  cy.contains("button", "Add").click();
  // Wait a bit for the database operation to complete
  cy.wait(500);
});

Then("I should see {string} in the task list", (taskText: string) => {
  cy.contains(taskText).should("be.visible");
});

Given("I have added a task {string}", (taskText: string) => {
  cy.get('input[placeholder*="task"]').clear().type(taskText);
  cy.contains("button", "Add").click();
  cy.wait(500); // Wait for database operation
  cy.contains(taskText).should("be.visible");
});

When("I click the checkbox for {string}", (taskText: string) => {
  cy.contains(taskText).parent().find('input[type="checkbox"]').click();
});

Then("the task {string} should be marked as done", (taskText: string) => {
  cy.contains(taskText).parent().find('input[type="checkbox"]').should("be.checked");
});

Then("I should see a completion timestamp", () => {
  cy.contains(/Completed At Date:/).should("be.visible");
});

Given("I have added tasks:", (dataTable: { hashes: () => { task: string }[] }) => {
  const tasks = dataTable.hashes();
  tasks.forEach((row) => {
    cy.get('input[placeholder*="task"]').clear().type(row.task);
    cy.contains("button", "Add").click();
    cy.wait(500); // Wait for database operation
    cy.contains(row.task).should("be.visible");
  });
});

Then("I should see all added tasks in the list", () => {
  // Verify each specific task is visible
  cy.contains("Review pull requests").should("be.visible");
  cy.contains("Update documentation").should("be.visible");
  cy.contains("Fix bug in auth module").should("be.visible");
});
