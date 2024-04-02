#! /bin/sh
echo "----------------------------------------------------------------------"
echo "To setup the virtual environment & install required packeges"
echo "----------------------------------------------------------------------"
if [ -d ".env" ];
then
    echo ".env folder exists. Installing using pip"
else
    echo "creating .env and install using pip"
    python3 -m venv .env
fi

# Activating virtual env
. .env/bin/activate

# Upgrading pip & install required packeges
pip install --upgrade pip
pip install -r requirements.txt
deactivate