# Cloud Foundry to Code Engine terminology

To prepare a migration, it is helpful to know how the usual Cloud Foundary terminology maps to the relevant Code Engine terms.


| Cloud Foundry | Code Engine | Definition / Relation to Cloud Foundry |
| -- | -- | -- |
| Organization and space | Resource Group and Project | The way a workload or solution and its resources are organized. The mapping or assignment is defined by the user. [Resource Groups](https://cloud.ibm.com/docs/account?topic=account-rgs) help to manage resources in an IBM Cloud account. [Projects](https://cloud.ibm.com/docs/codeengine?topic=codeengine-manage-project) bundle resources for within Code Engine. |
| App / Application | App / Application | A deployed program that responds to HTTP requests (e.g. REST API, web page request, event). |
|  `cf push` | Build | Process of building a container image from source code. Cloud Foundry takes care of transfering the files and preparing the runtime container. Code Engine requires to define a **build**, submit a **buildrun**, then deploy an app **revision** from it. |
| User-provided service | Secret or ConfigMap | A key/value pair with configuration data. A [secret or configmap](https://cloud.ibm.com/docs/codeengine?topic=codeengine-configmap-secret) can be exposed to a workload via a volume mount or as environment variable. |
| | Registry | A container registry - used to store container images (e.g. ICR - [IBM Container Registry](https://cloud.ibm.com/docs/Registry?topic=Registry-registry_overview)). |
| Service Binding | Service Binding | Attach an IBM Cloud-managed service to a workload. The credentials and connection information is exposed to the workload via environment variables. |
| Routes & Domain | | Define and manage external URLs to your workloads. Code Engine provides this implicitly. Custom domains can be assigned via [IBM Cloud Internet Services](https://cloud.ibm.com/docs/cis?topic=cis-about-ibm-cloud-internet-services-cis). |

