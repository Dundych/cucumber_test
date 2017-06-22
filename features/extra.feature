Feature: Additional tests

  Scenario Outline: Add computer. Check increase amount of computers
    Given Go to homepage
    When Save current amount of computers to variable "beforeAdding"
    When Click "Add a new computer" button
    When Set "Computer name" field to "<name>"
    And Click "Create this computer" button
    And Message "Done! Computer <name> has been created" is displayed
    Then Header of current page contains text "computers found"
    When Save current amount of computers to variable "afterAdding"
    When Value in variable "afterAdding" greater then value in variable "beforeAdding" by 1
    Examples:
      | name      |
      | Dmytro PC |

  Scenario Outline: Delete computer. Check decrease amount of computers
    Given Go to homepage
    When Click "Add a new computer" button
    When Set "Computer name" field to "<name>"
    And Click "Create this computer" button
    Then Header of current page contains text "computers found"
    And Message "Done! Computer <name> has been created" is displayed
    When Save current amount of computers to variable "beforeDeleting"
    When Search cumputers with name "<name>"
    Then Result table contains elements with name "<name>"
    When Open element with name "<name>"
    And Click "Delete this computer" button
    Then Header of current page contains text "computers found"
    And Message "Done! Computer has been deleted" is displayed
    Then Header of current page contains text "computers found"
    When Save current amount of computers to variable "afterDeleting"
    When Value in variable "beforeDeleting" greater then value in variable "afterDeleting" by 1
    Examples:
      | name      |
      | Dmytro PC |

  Scenario Outline: Add computer check required fields
    Given Go to homepage
    When Click "Add a new computer" button
    And Click "Create this computer" button
    Then Page contains error
    Then Error contains text "Computer name"
    Then Header of current page does not contains text "computers found"
    Then Header of current page contains text "Add a computer"
    When Set "Computer name" field to "<name>"
    And Click "Create this computer" button
    And Message "Done! Computer <name> has been created" is displayed
    Then Header of current page contains text "computers found"
    Examples:
      | name      |
      | Dmytro PC |

  Scenario Outline: Add computer check date fields
    Given Go to homepage
    When Click "Add a new computer" button
    When Set "Computer name" field to "<name>"
    And Set "Introduced date" field to "<introduced err>"
    And Set "Discontinued date" field to "<discontinued err>"
    And Click "Create this computer" button
    Then Page contains error
    Then Error contains text "Introduced date"
    Then Error contains text "Discontinued date"
    Then Header of current page does not contains text "computers found"
    Then Header of current page contains text "Add a computer"
    And Set "Introduced date" field to "<introduced ok>"
    And Set "Discontinued date" field to "<discontinued ok>"
    And Click "Create this computer" button
    And Message "Done! Computer <name> has been created" is displayed
    Then Header of current page contains text "computers found"
    Examples:
      | name      | introduced err  | introduced ok   | discontinued err  | discontinued ok   |
      | Dmytro PC | 2017-06-40      | 2017-06-01      | 2020-01-50        | 2020-01-05        |

  Scenario Outline: Check filter by computer - negative
    Given Go to homepage
    When Click "Add a new computer" button
    When On page "ComputerEditPage" set controls to values
      | Control          | Value      |
      | name             | <name1>     |
    And Click "Create this computer" button
    Given Go to homepage
    When Click "Add a new computer" button
    When On page "ComputerEditPage" set controls to values
      | Control          | Value      |
      | name             | <name2>     |
    And Click "Create this computer" button
    Then Header of current page contains text "computers found"
    When Search cumputers with name "<name1>"
    Then Result table contains "0" elements with name "<name2>"
    Examples:
      | name1       | name2        |
      | 1 Dmytro PC | 2 Dmytro PC  |

  Scenario Outline: Check filter by computer - clear filter
    Given Go to homepage
    When Click "Add a new computer" button
    When Set "Computer name" field to "<name>"
    And Click "Create this computer" button
    Given Go to homepage
    When Save current amount of computers to variable "beforeFiltering"
    When Search cumputers with name "<name>"
    When Save current amount of computers to variable "afterFiltering"
    Then Value in variable "beforeFiltering" greater then value in variable "afterFiltering"
    Then Result table contains elements with name "<name>"
    When Clear filter
    When Save current amount of computers to variable "afterCleareFilter"
    Then Value in variable "beforeFiltering" equal to value in variable "afterCleareFilter"
    Examples:
      | name      |
      | Dmytro PC |