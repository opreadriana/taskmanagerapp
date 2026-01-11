Feature: Homepage
  As a user
  I want to access the homepage
  So that I can navigate to the todo list and use the AI assistant

  Scenario: View homepage content
    Given I am on the homepage
    Then I should see the productivity quotes
    And I should see the "Go to To-Do List page" button
    And I should see the AI Assistant section

  Scenario: Navigate to todo page
    Given I am on the homepage
    When I click the "Go to To-Do List page" button
    Then I should be on the todo page

  Scenario: Ask AI assistant a question
    Given I am on the homepage
    When I type "What should I focus on today?" in the AI input
    And I click the Ask AI button
    Then I should see the AI response
