# Node.js with Cloudant app
description to follow

## Deployment steps (rough guide)

- create a Cloudant instance
- clone this repo
- set the Cloud Foundry org and space
  ```sh
  ibmcloud target --cf
  ```
- push the code
  ```sh
  ibmcloud cf push cf2ce-demo
  ```
- bind / connect Cloudant to the app with Manager role
- restage the app
