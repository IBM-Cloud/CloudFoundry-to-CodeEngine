# IBM Cloud: A comparison of Cloud Foundry and Code Engine CLI commands

The following is an overview and comparison of **some** CLI commands of Cloud Foundry (CF) and Code Engine (CE).

### Accesing logs and events (troubleshooting)

Sometimes, a deployment fails. Then, it is time to access logs to find out the reason:

- Cloud Foundry:
  ```
  ibmcloud cf logs APP --recent
  ```

- Code Engine:
  ```
  ibmcloud ce app logs -n APP
  ibmcloud ce app events -n APP
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
  ibmcloud cf app APP
  ```

- Code Engine:
  ```
  ibmcloud ce app get -n APP
  ```