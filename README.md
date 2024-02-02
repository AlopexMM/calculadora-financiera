# Calculadora financiera

La aplicación es una pagina con la que se puede calcular el valor del sueldo en dolares para un mes determinado y ver cuanto se estaria cobrando en pesos si estuviera indexado

## TODO

- [X] Dockerizar
- [ ] Realizar el deploy
  
## Run build
docker build -t alopexmm/calculadora-financiera-app .

## Run container
docker run -it -p 8080:80 --rm --name dockerize-calculadora-financiera-app-1 alopexmm/calculadora-financiera-app