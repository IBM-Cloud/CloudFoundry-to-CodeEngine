# IBM Cloud: A comparison of Cloud Foundry and Code Engine CLI commands

The following is an overview and comparison of **some** CLI commands of Cloud Foundry (CF) and Code Engine (CE).

### Accesing logs and events (troubleshooting)

Sometimes, a deployment fails. Then, it is time to access logs to find out the reason:

- Cloud Foundry:
  ```
  ibmcloud cf logs APPNAME --recent
  ```

- Code Engine:
  ```
  ibmcloud ce app logs -n APPNAME
  ibmcloud ce app events -n APPNAME
  ```

See the Code Engine documentation page [Viewing logs](https://cloud.ibm.com/docs/codeengine?topic=codeengine-view-logs) for details and more options.


### List your apps
List your apps in your current org/space (CF) or project (CE).

- Cloud Foundry:
  ```
  ibmcloud cf apps
  ```

- Code Engine:
  ```
  ibmcloud ce app list
  ```

### Get detailed information about an app
Retrieve details for an app.

- Cloud Foundry:
  ```
  ibmcloud cf app APPNAME
  ```

- Code Engine:
  ```
  ibmcloud ce app get -n APPNAME
  ```

### Control your app in terms of access (visibility / availability)

- Cloud Foundry: Start and stop the app
  Stop the app to become unavailable:
  ```
  ibmcloud cf stop APPNAME
  ```
  Start the app to become available again:
  ```
  ibmcloud cf start APPNAME
  ```
- Code Engine: Set the visibility to **public** / **private** and **project**
  Set the visibility to project for the app to become unavailable
  ```
  ibmcloud ce app update -n APPNAME --visibility project
  ```
  Set the visibility to public or private for the app to become visible again
  ```
  ibmcloud ce app update -n APPNAME --visibility public
  ```
