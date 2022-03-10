# Node.js with Cloudant app
description to follow

this branch has a hybrid `server.js` which works with Cloud Foundry and Code Engine environments (and locally)

## Deployment steps (rough guide), Cloud Foundry

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

## Deployment steps (rough guide), Code Engine
    
- Create a Code Engine project and switch to it.
- Configure a secret for the container registry, so that new images can be pushed there and pulled for deployment.
- Set up a build based on this repo and branch, the Dockerfile is in the root path
- Perform a buildrun
- Create an app **cfce-demo**, pick the image from the above build
- Bind the app **cf2ce-demo** to the Cloudant service instance with role **Manager**.
  ```sh
  ibmcloud ce app bind --name cf2ce-demo --si Cloudant-CFCE -r Manager
  ```
  or, if you already have created a service instance key, e.g., by
  ```
  ibmcloud resource service-key-create Cloudant-CFCE-getstarted-Manager Manager --instance-name Cloudant-CFCE --output json
  ```
  then bind by reusing the service credentials:
  ```
  ibmcloud ce app bind --name cf2ce-demo --service-credential Cloudant-CFCE-getstarted-Manager --service-instance Cloudant-CFCE
  ```
- Visit the app's URL.