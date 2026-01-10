Feature: Task Management
  As a user
  I want to manage my tasks
  So that I can stay organized and productive

  Scenario: Add a new task
    Given I am on the todo page
    When I enter "Buy groceries" in the task input
    And I click the add button
    Then I should see "Buy groceries" in the task list

  Scenario: Mark a task as complete
    Given I am on the todo page
    And I have added a task "Finish project report"
    When I click the checkbox for "Finish project report"
    Then the task "Finish project report" should be marked as done
    And I should see a completion timestamp

  Scenario: Add multiple tasks
    Given I am on the todo page
    And I have added tasks:
      | task                    |
      | Review pull requests    |
      | Update documentation    |
      | Fix bug in auth module  |
    Then I should see all added tasks in the list
