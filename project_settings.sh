#!/bin/bash

workspace_installed=$(find . -name "workspace" | grep -o workspace);

echo $workspace_installed;

if [ "" == "$workspace_installed" ]; then
    
    echo "Creating $workspace_installed folder"
    mkdir workspace;

    echo "cloning git repo mongo_udemy"
    git clone https://github.com/mark-37/mongo_udemy.git ./workspace/
    
    echo "Done..!!!"
fi