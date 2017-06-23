## CUCUMBER TEST PROJ
***

> Info !

> You'll need to Node > 6.x.x for correct runs

> Node 6 (LTS) does not contain async/await func, so use 'asyncawait' npm (it use fibers inside), it possible troubles with install fibers on mac

> Commands should be run from the root directory of project

### USAGE

:: install npm modules 

    npm i

:: download the necessary binaries for webdriver-manager

    node_modules\.bin\webdriver-manager update

:: run test

    node node_modules\protractor\built\cli.js conf.js

:: OR

    npm test

:: check report at ./report/cucumber_report.html

> There is troubles with Allure + Cucumber 2.0

> TODO LIST

> use Node 7 with native async/await

> use steps inside step for minimum duplication

> add screenshot reporter