#! /bin/sh
echo "----------------------------------------------------------------------"
echo "To activate environment and run the app"
echo "----------------------------------------------------------------------"
if [ -d ".env" ];
then
    echo "Enabling virtual env"
else
    echo "No Virtual env. Please run local_setup.sh first"
    exit N
fi

# Activating virtual env
. .env/bin/activate
export ENV=development
python app.py
deactivate