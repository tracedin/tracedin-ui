# Tracedin-UI
[![Netlify Status](https://api.netlify.com/api/v1/badges/c4691709-edc5-4996-bbe9-2f9a84037340/deploy-status)](https://app.netlify.com/sites/tracedin/deploys)

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/react query-FF4154?style=for-the-badge&logo=react query&logoColor=white">
<img src="https://img.shields.io/badge/ant design-0170FE?style=for-the-badge&logo=ant design&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

This repository is a web UI that visualizes the results collected from Tracedin.

It was featured in the 2024 Capstone Design project at Chungbuk National University.

## 🎨 Layout

You can view [the demo](https://tracedin.netlify.app/) via Netlify.

<p align="center">
    <img src=".github/readme/system-toplogy.png" alt="Image Example" width="400px" height='200px'>
    <img src=".github/readme/tx-timeline.png" alt="Image Example" width="400px" height='200px'>
</p>
<p align="center">
    <img src=".github/readme/heatmap.png" alt="Image Example" width="400px" height='200px'>
    <img src=".github/readme/tx-list.png" alt="Image Example" width="400px" height='200px'>
</p>


## 🚀 Getting started

### Install
```shell
npm install
```

### Configure App
The current .env file defines the backend endpoint.

If you want to use a different endpoint, please configure it through the environment variable.
```shell
export VITE_TRACEDIN_API=CUSTOM BACKEND ENDPOINT
```

### Start
```shell
npm start
```
### build for production
```shell
npm run build
```
