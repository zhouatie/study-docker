# node ./index.js
echo $IS_START_BY_COMPOSE
if [ $IS_START_BY_COMPOSE -eq 1 ]
then
    echo 'nodejs ==> start ===================== nodejs'
    sleep 15
    node ./index.js
    echo 'nodejs ==> end ===================== nodejs'
else
    node ./index.js
fi
