# IBM Cloud: A comparison of Cloud Foundry and Code Engine CLI commands

## Accesing logs and events (troubleshooting)

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
