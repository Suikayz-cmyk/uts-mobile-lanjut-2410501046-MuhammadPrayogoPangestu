# Resep Kita App - UTS Mobile Lanjut

## Informasi Mahasiswa

- Nama : Muhammad Prayogo Pangestu
- Nim : 2410501046
- Kelas : B
- Tema : A. ResepKita - Katalog Resep Kuliner

## Tech Stack

- React Native
- Expo
- JavaScript
- React Navigation
- Zustand
- Fetch API
- TheMealDB API

## Cara Install dan Run

- clone project
- npm install
- npx expo start

## Screenshot Aplikasi

Berikut tampilan aplikasi:

### Home Screen

<img src="assets/screenshoot/Home.jpeg" width="250"/>

### Browse Screen

<img src="assets/screenshoot/Browse.jpeg" width="250"/>

### Detail Screen

<img src="assets/screenshoot/Detail.jpeg" width="250"/>

### Favorites Screen

<img src="assets/screenshoot/Favorites.jpeg" width="250"/>

### Search Screen

<img src="assets/screenshoot/Search.jpeg" width="250"/>

### About Screen

<img src="assets/screenshoot/About.jpeg" width="250"/>

## Link Vidio demo

- https://youtu.be/m69NPaF6aBs?si=QTLBQ84GyQsimDQO
- https://drive.google.com/drive/folders/1kN_LeAkXrKhv4-5pPGXGKFwDSS54-gOP?usp=sharing

## Penjelasan State Management

Saya memilih Zustand karena implementasinya ringan, sederhana, dan mudah digunakan dibanding dan dengan Redux.

### Kelebihan Zustand pada project ini:

Tidak perlu banyak kode tambahan sehingga lebih simpel
Mudah membuat global state favorit
Cocok untuk project skala kecil hingga menengah
Syntax lebih sederhana

### Kekurangan:

Komunitas dan tools belum sebesar Redux
Untuk project besar biasanya butuh struktur tambahan

## Referensi

1. React Native Documentation  
   https://reactnative.dev/docs/intro-react-native-components

2. React Navigation Documentation  
   https://reactnavigation.org/docs/navigating

3. Zustand Documentation  
   https://zustand-demo.pmnd.rs/

4. TheMealDB API Documentation  
   https://www.themealdb.com/api.php

5. Stack Overflow - React Navigation nested navigation  
   https://stackoverflow.com/questions/49826920/how-to-navigate-between-different-nested-stacks-in-react-navigation

6. MDN Web Docs - JavaScript Fetch API  
   https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

## Refleksi

### Kendala

1. Tombol back sempat kembali ke screen yang salah saat membuka Detail dari Favorites atau Search.
2. Pernah muncul error hook React saat menggunakan Zustand karena penempatan hooks belum tepat.

### Solusi

1. DetailScreen dipindahkan ke root navigator agar bisa dibuka dari semua screen dan tombol back berjalan sesuai asal halaman.
2. Penggunaan hooks diperbaiki sesuai Rules of Hooks agar error tidak muncul lagi.
