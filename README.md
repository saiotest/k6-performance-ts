<div align="center">

[![Test in QA🧪](https://github.com/upex-galaxy/k6-performance-ts/actions/workflows/test.yml/badge.svg)](https://github.com/upex-galaxy/k6-performance-ts/actions/workflows/test.yml)

# Plantilla para usar TypeScript con k6
</div>

Este repositorio proporciona un proyecto base para comenzar a usar TypeScript en tus scripts de k6.

## Prerrequisitos

- [k6](https://k6.io/docs/getting-started/installation)
- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Instalación

**Creando un proyecto desde la plantilla `k6-performance-ts`**

Para generar un proyecto TypeScript que incluya las dependencias y la configuración inicial, navega a la página [template-typescript](https://github.com/k6io/template-typescript) y haz clic en **Use this template**.

**Instalar dependencias**

Clona el repositorio generado en tu máquina local, muévete a la carpeta raíz del proyecto e instala las dependencias definidas en [`package.json`](./package.json)

```bash
git clone <project-url>
```
```bash
cd k6-performance-ts
```
```bash
yarn
```

## Asegúrate de estar usando Node v16
Para asegurarte de que estés usando la versión de Node que necesita el repo, ejecuta simplemente:
```bash
nvm use
```
*(si no tienes instalado nvm, Qué esperas!? instalado y vuelve a intentar, si no tienes la versión de Node del repo debes instalarlo con nvm install)*


## Ejecutando la prueba

Para ejecutar una prueba escrita en TypeScript, primero tenemos que transpilar el código TypeScript a JavaScript y empaquetar el proyecto

```bash
yarn build
```

Este comando crea los archivos finales de prueba en la carpeta `./webpack`.

Una vez hecho esto, podemos ejecutar nuestro script de la misma manera que usualmente lo hacemos, por ejemplo:

```bash
k6 run webpack/performance.test.js
```

## Escribiendo tus propias pruebas

Reglas para escribir pruebas:
- El código de prueba se encuentra en la carpeta `tests`
- Los puntos de entrada para las pruebas deben tener la extensión "_test.ts_" en el nombre para distinguirlos de los archivos auxiliares. Puedes cambiar la entrada [aquí](./webpack.config.js#L8). 
- Si se requieren archivos estáticos, agrégalos a la carpeta `./assets`. Su contenido se copia a la carpeta de destino (`webpack`) junto con los scripts compilados.

### Transpilación y Empaquetamiento

Por defecto, k6 solo puede ejecutar código JavaScript ES5.1. Para usar TypeScript, tenemos que configurar un empaquetador que convierta el código TypeScript a código JavaScript.

Este proyecto utiliza `Babel` y `Webpack` para empaquetar los diferentes archivos, utilizando la configuración del archivo [`webpack.config.js`](./webpack.config.js).

Si quieres aprender más, consulta [Bundling node modules in k6](https://k6.io/docs/using-k6/modules#bundling-node-modules).
