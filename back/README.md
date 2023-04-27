# To run app locally:
* While in `/back/` folder
* Create virtual environment: `python -3 -m venv venv`
* Activate virtual environmnent: `.\venv\Scripts\activate` for Windows, `venv/bin/activate` for MAC/Linux
* Install requirements `pip install -r .\requirements`
* Set `AZURE_STORAGE_CONNECTION_STRING` environment variable to Azure storage account endpoint
* Run `flask --app imazure run --debug`
