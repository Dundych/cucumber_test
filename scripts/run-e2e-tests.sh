#!/bin/bash
# Move to the protractor project folder (it should be defined in Dockerfile or mounted by "run" script)
cd /protractor

# Install the necessary npm packages
npm install

# Run the Selenium installation script, located in the local node_modules/ directory.
# This script downloads the files required to run Selenium itself and build a start script and a directory with them.
# When this script is finished, we can start the standalone version of Selenium with the Chrome driver by executing the start script.
node ./node_modules/protractor/bin/webdriver-manager update

# Right now this is not necessary, because of 'directConnect: true' in the 'e2e.conf.js'
#echo "Starting webdriver"
#node ./node_modules/protractor/bin/webdriver-manager start [OR webdriver-manager start] &
#echo "Finished starting webdriver"
sleep 20

echo "Running Protractor tests"
# Test project launch configuration file (e2e.conf.js) should be passed here.
node ./node_modules/protractor/built/cli.js $@
export RESULT=$?

echo "Protractor tests have done"
# Remove temporary folders
rm -rf .config .local .pki .cache .dbus .gconf .mozilla
# Set the file access permissions (read, write and access) recursively for the result folders
chmod -Rf 777 allure-results test-results

exit $RESULT