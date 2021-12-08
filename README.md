## To Deploy App in Google Cloud Platform (GCP)

In this tutorial it is assumed that you have created GCP account and project already.

The API is already deployed here: https://myproject1-dot-sse2021-330922.ew.r.appspot.com/

If you want to deploy your own follow steps below.

**Create VM instance**

In GCP go to Dropdown Menu (upper left corner) > Compute Engine > VM instances.
In VM instances menu go to CREATE INSTANCE.
You need to set up this properties for the instance: 

- instance name (recommended inst1)

- region and zone (e.g. europe-west1 europe-west1-b)

- Machine configuration as Series N1 and Machine type f1-micro

- OS Debian GNU/Linux 10

- Allow full access to all Cloud APIs

- Allow HTTP traffic

Please set up only these properties and no more.

Once you set up properties click on CREATE button.

**Connect to VM instance**

Open Google Cloud Shell

In the shell be sure you are in the same project as you create instance. You should see project id in the shell in command line.

In the shell connect to the VM instance with this command:

```bash

gcloud compute ssh <your-instance-name>

```

If you are connected in the instance download nodejs and git: 

```bash

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs git

```

**Clone repository of the API**

Inside the instance clone repository of the API from github:

```bash

git clone https://github.com/UP957155/signOff2Repo.git
cd signOff2Repo

```

Install all dependencies:

```bash

npm i

```

Run the API inside the instance to be sure there are no bugs:

```bash

sudo PORT=80 node app

```

Once the API is running go the external IP (e.g. 35.205.88.186) of the instance in the browser (Chrome recommended).
You can find the IP inside the instance description in VM instances menu.

If you can see in the browser that API is successfully running then stop the API inside the shell with ctrl + C (Windows) or control^ + C (MacOS).

**Prepare API to be deployed**

In the shell inside the signOffRepo folder create app.yaml file:

```bash

nano app.yaml

```

Inside the file you can set up service name you want. Below is example you need to copy into the file. You should be ok with runtime nodejs14:

```yaml

runtime: nodejs14
service: myproject

```

Save and close file with ctrl + O (Save) and ctrl + X (Close) (Windows) or control^ + O (Save) and control^ + X (Close) (MacOS).

**Deploy API**

Inside the repo folder in the instance run this command:

```bash

gcloud app deploy

```

After the API is deployed run this command to get the API's URL:

```bash

gcloud app browse -s <your-service-name>

```

Open the URL in the browser and in the API UI run the test. Click the 'run automatic tests now' button. The test has to pass.
