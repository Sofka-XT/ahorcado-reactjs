# Juego de Ahorcado: ReactJS+Docker+Kubernetes
En este pequeño proyecto vamos a explorar los fundamentos de reactjs aplicando un simple juego de ahorcado. Con base a este juego podemos compreder fundamentos de ReactJS. 

Puedes ver como se realizó este juego aquí:

https://www.youtube.com/watch?v=uOnH_oqIfSU&list=PL0IrPQPrkqoFRvLMemCJTboxQtC8MvUUS

## Instacción y puesta en marcha

### `npm install` para instalar
### `npm run start` para correr

## Practica de Kubernetes

Ya teniendo en cuenta lo anterior vamos a desplegarlo dentro de un sistema de contenedores, ante esto debemos hacer lo siguientes pasos:

### Construir la aplicación
`npm run build`

### Compilar la solución con docker
`docker build -t xtsofka/ahorcado-reactjs .`

### Publicar la imagen en un register publico
`docker push xtsofka/ahorcado-reactjs:latest`

### Instalamos con cluster para kubernetes 


En el siguiente link vamos a explorar e instalar un cluster para trabajo local:

https://microk8s.io/#install-microk8s

`microk8s start`

#### Aplicamos el manifiesto de kubernetes 

`kubectl apply -f deployment.yaml`

`kubectl get deployment -w`

`kubectl get nodes -o wide`

`kubectl scale deployment ahorcado-reactjs --replicas=10`

`kubectl get deployment -w`

`kubectl scale deployment ahorcado-reactjs --replicas=3`

`kubectl delete service ahorcado-reactjs`

`kubectl delete deployment ahorcado-reactjs`

#### Crear un empaquetador 

installar https://helm.sh/docs/intro/install/

Habilitar: 

`microk8s enable helm3`

Crear empaquetado y parametrizar:

`helm create ahorcado-reactjs`

- Cambiar la imagen en la implementación en valores 
- Cambiar la versión o tag en valores
- Cambiar el puerto de mapeo dentro del servicio

## Conclusion

En este tutorial, aprendimos cómo crear una aplicación React y compilarla para producción. Después de crear la aplicación, aprendimos cómo dockerizarla y enviarla a su cuenta de Docker Hub. Finalmente, aprendimos cómo crear y configurar un clúster local de Kubernetes, implementar la aplicación React dockerizada en el clúster y cómo escalar la aplicación.

Para obtener más información sobre cómo acoplar aplicaciones y cómo implementarlas en un clúster de Kubernetes, asegúrese de leer la documentación de Docker y Kubernetes.


