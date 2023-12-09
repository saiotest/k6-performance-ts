if [[ $(nvm ls | grep v18.19.0) == "" ]]; then
  nvm install v18.19.0
else
  nvm use v18.19.0
fi