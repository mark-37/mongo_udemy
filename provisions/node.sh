#!/bin/bash

echo "***updating***" 
apt-get update
apt-get install -y autoremove
echo "Installing Node Js"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install node --lts

echo node -v >> node_version.txt

echo "!!!Installation Finished!!!"

echo "Installing mean stack"
