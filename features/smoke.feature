Feature: Smoke

  Scenario Outline: Add computer
    Given Go to homepage
    Then Header of current page contains text "computers found"
    And Button "Add a new computer" is presented
    When Click "Add a new computer" button
    Then Page with header "Add a computer" is presented
    When Set "Computer name" field to "<name>"
    And Set "Introduced date" field to "2017-06-01"
    And Set "Discontinued date" field to "2020-01-05"
    And Set "Company" dropdown to "Apple Inc."
    And Click "Create this computer" button
    Then Header of current page contains text "computers found"
    And Message "Done! Computer <name> has been created" is displayed
    Examples:
      | name      |
      | Dmytro PC |


  Scenario Outline: Update computer
    Given Go to homepage
    Then Header of current page contains text "computers found"
    And Button "Add a new computer" is presented
    When Click "Add a new computer" button
    Then Page with header "Add a computer" is presented
    When On page "ComputerEditPage" set controls to values
      | Control          | Value      |
      | name             | <name>     |
      | introducedDate   | 2017-06-01 |
      | discontinuedDate | 2020-01-05 |
      | company          | Apple Inc. |
    And Click "Create this computer" button
    Then Header of current page contains text "computers found"
    And Message "Done! Computer <name> has been created" is displayed
    When Search cumputers with name "<name>"
    Then Result table contains elements with name "<name>"
    When Open element with name "<name>"
    Then Page with header "Edit computer" is presented
    When On page "ComputerEditPage" set controls to values
      | Control | Value      |
      | name    | new <name> |
    And Click "Save this computer" button
    Then Header of current page contains text "computers found"
    And Message "Done! Computer new <name> has been updated" is displayed
    Examples:
      | name      |
      | Dmytro PC |


  Scenario Outline: Delete computer
    Given Go to homepage
    Then Header of current page contains text "computers found"
    And Button "Add a new computer" is presented
    When Click "Add a new computer" button
    Then Page with header "Add a computer" is presented
    When On page "ComputerEditPage" set controls to values
      | Control          | Value      |
      | name             | <name>     |
      | introducedDate   | 2017-06-01 |
      | discontinuedDate | 2020-01-05 |
      | company          | Apple Inc. |
    And Click "Create this computer" button
    Then Header of current page contains text "computers found"
    And Message "Done! Computer <name> has been created" is displayed
    When Search cumputers with name "<name>"
    Then Result table contains elements with name "<name>"
    When Open element with name "<name>"
    Then Page with header "Edit computer" is presented
    And Click "Delete this computer" button
    Then Header of current page contains text "computers found"
    And Message "Done! Computer has been deleted" is displayed
    Examples:
      | name      |
      | Dmytro PC |


  Scenario Outline: Check filter by computer - positive
    Given Go to homepage
    When Click "Add a new computer" button
    When On page "ComputerEditPage" set controls to values
      | Control | Value   |
      | name    | <name1> |
    And Click "Create this computer" button
    Given Go to homepage
    When Click "Add a new computer" button
    When On page "ComputerEditPage" set controls to values
      | Control | Value   |
      | name    | <name2> |
    And Click "Create this computer" button
    Then Header of current page contains text "computers found"
    When Search cumputers with name "<name1>"
    Then Result table contains elements with name "<name1>"
    Examples:
      | name1       | name2       |
      | 1 Dmytro PC | 2 Dmytro PC |

