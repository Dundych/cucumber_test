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

    node node_modules\protractor\bin\webdriver-manager update

:: run test

    node node_modules\protractor\built\cli.js conf.js

:: OR

    npm test

### run inside docker container (docker required)

:: 1- inside container from docker hub https://github.com/sequenceiq/docker-e2e-protractor

:: run tests

    docker run -it --rm --name protractor-runner -v $(pwd):/protractor/project hortonworks/docker-e2e-protractor conf.js

:: 2- inside cusrom container

:: Create custom container (for run test in headless chrome (version >= 60)

    docker build . -t headless-test-runner

:: Run tests inside custom container

    docker run -it --rm --name headless-test-runner --privileged --network=host -v $(pwd):/protractor headless-test-runner bash /protractor/scripts/run-e2e-tests.sh conf.js

:: check report at ./report/cucumber_report.html

> You have to clean 'node-modules' folder if you want run test on linux and windows

> There is troubles with Allure + Cucumber 2.0

> TODO LIST

> use Node 7 with native async/await

> use steps inside step for minimum duplication

> add screenshot reporter