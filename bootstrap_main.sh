#!/usr/bin/env bash


#Packages list

declare -a packages=( git build-essential gimp )
declare -a packages_status
k=0

installing="sudo apt-get install -y "
# installing=""

cmd="sudo apt-get install --dry-run "

for i in "${packages[@]}"
do
    status=$(dpkg-query -W -f='${status}' $i 2>&1 | grep "install ok installed")
    # echo ${packages_status[$i]}
    if [ "$status" == "" ]; then
        packages_status[$k]='Not_Installed'
        installing=$installing" "$i
    else    
        packages_status[$k]='Installed'
    fi    
    k=$((k+1))
done

echo ${packages_status[@]}
$installing
# cmd=$cmd$installing

# $cmd