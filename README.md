# Node.js with Cloudant app
description to follow


## Deployment steps (rough guide)
    
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
  ibmcloud resource service-key-create Cloudant-CFCE-getstarted-Manager Manager --instance-name Cloudant-CFCE
  ```
  then bind by reusing the service credentials:
  ```
  ibmcloud ce app bind --name cf2ce-demo --service-credential Cloudant-CFCE-getstarted-Manager
  ```
- Visit the app's URL.



### GitHub Workflow to deploy new app revision to Code Engine

An existing Code Engine app can be automatically updated after a push of a new code version. The included GitHub Workflow builds the container image, pushes it to the container registry, and updates the Code Engine app. Create the listed secrets and enable the action.

Environment variables to set as GitHub repository secrets:
- IBM_CLOUD_API_KEY: The API key to use.
- IBM_CLOUD_RESOURCE_GROUP: The IBM Cloud resource group of the Code Engine project, e.g., **default**.
- IBM_CLOUD_REGION: The IBM Cloud region to connect to, e.g., **us-south**.
- ICR_HOSTNAME: The hostname of your container registry, e.g., **us.icr.io**.
- ICR_NAMESPACE: The namespace part of the container image, e.g., **myproject**.
- ICR_REPOSITORY: The repository part of the container image name, e.g., **myapp**.
- CE_PROJNAME: The name of the Code Engine project, e.g., **sample**.
- CE_APPNAME: The name of the Code Engine app to update, e.g., **myapp**.

