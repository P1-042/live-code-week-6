# Phase 2 - Live Code 1

#### WAKTU : 165 Menit / 2 Jam 45 menit

## My Food List

Pada live code kali ini, kamu diminta untuk membuat aplikasi
menggunakan **client-server model**.

Fork repo ini, didalam repo ini terdapat 2 folder, `client`
dan `server`. Setelah selesai mengerjakan, buat pull request dengan title nama
lengkap kamu (ex: Yoki Suprayogi) dan berikan comment
environment variables apa saja yang kamu gunakan dalam mengerjakan
aplikasi ini (beserta value aslinya).

**Summary:**

- Aplikasi ini memungkinkan user untuk menambahkan daftar menu makanan, 
- User harus login terlebih dahulu untuk dapat menambah menu makanan dan melihat menu makanan apa saja yang sudah dibuat (*menu makanan yang ditampilkan hanya milik user yang sedang login!*).
- Aplikasi ini harus dibuat SPA (Single Page Application)
- Wajib menggunakan sequelize dan postgre sebagai db serta HTML-CSS-JQuery untuk membuat tampilan aplikasi.

**Notes:**

- Berhubung kompetensi live code ini bukan MVC, maka kamu
  diperbolehkan untuk tidak membuat controller di server. Apabila kamu
  membuat routing nya di dalam 1 file routes/index.js juga diperbolehkan.
- File template HTML telah disediakan, boleh menggunakan template ini, boleh juga
  menggunakan template sendiri asalkan layout-nya sama.
- Tidak memenuhi requirement yang terdapat pada soal mengakibatkan pengurangan nilai.
- Nama database **harus** `phase2_livecode_1`

**Rules:**

- Aplikasi ini harus SPA dan Reaktif. Apabila untuk menjalankan fitur-fitur yang terdapat pada aplikasi ini membutuhkan page refresh maka nilai akan dikurangi **10 poin**
- push ke github node_modules dan/atau .env nilai dikurangi **10 poin**
- Nama database selain `phase2_livecode_1` nilai dikurangi **10 poin**
- Tidak memberikan environment variable **beserta** valuenya  nilai dikurangi **5 poin**
- menggunakan `alert()` di sisi client nilai dikurangi **10 poin**
- Silahkan browsing (googling/stackoverflow/dokumentasi) untuk mencari solusi dari permasalahan yang kalian hadapi. Namun, **DILARANG** membuka/melihat repository/code milik sendiri maupun orang lain, dianggap bentuk kecurangan.
- Segala bentuk indikasi kecurangan mengakibatkan live-code tidak dinilai dan diproses sesuai aturan yang berlaku di hacktiv8 tanpa perlu konfirmasi dahulu kepada yang bersangkutan.

## **RELEASE 0 - Creating Migration, and Table.**

Buatlah migration, dan table
- User
  - field: 
    - email: string
    - password: string
- Food
  - field:
    - title: string
    - price: integer
    - ingredients: string
    - tag: string

## **RELEASE 1 - Authentication (Login & Register)**

### **Server - Register**
Buatlah endpoint untuk register sesuai dengan ketentuan sebagai berikut:

- route:
  - `POST /register`
- request:
  - body
    - `{ email: 'yokai@mail.com', password: '12345' }`
- response:
  - `201`: `{ id:1, email: 'yokai@mail.com' }`

**Tidak perlu** membuat sisi client dari fitur ini.

### **Server - Login**

Buatlah endpoint untuk login sesuai dengan ketentuan sebagai berikut:

- route:
  - `POST /login`
- request:
  - body
    - `{ email: 'yokai@mail.com', password: '12345' }`
- response:
  - `200`: `{ access_token: '...' }`

Gunakan package JWT untuk generate access token.

### **Client - Login & Logout**

Todo:

- Buatlah fitur login & logout di client side.
- Setelah berhasil login, maka form untuk login harus hilang, lalu
  muncul link/button untuk logout, beserta form untuk menambah menu makanan dan list menu makanan user login. Semua fitur di aplikasi ini mengharuskan user untuk login terlebih
  dahulu.
- Pastikan jika user sudah login dan masuk ke halaman utamanya, jika page di refresh, aplikasi akan langsung masuk ke halaman utama tanpa harus login terlebih dahulu.

NOTES: REGISTER CLIENT TIDAK PERLU ADA

## **Release 2 - Add new Food Menu**

### **Server**

Buatlah endpoint untuk menambahkan food dengan ketentuan
sebagai berikut:

- route:
  - `POST /foods`
- request
  - headers
    - `{ access_token }`
- body
  - `{ "title": "Ayam Bakar Madu", "price": 10000, "ingredients": "Ayam, Madu, Kecap", "tag": "ayam" }`
- response
  - `201`: `{ "id": 1, "title": "Ayam Bakar Madu", "price": 10000, "ingredients": "Ayam, Madu, Kecap", "tag": "ayam", "UserId": 1 }`

notes:

- Pastikan **hanya** user yang sedang login yang dapat menambahkan foods milik nya.
- semua field body diatas required / tak boleh kosong

### **Client**

Todo:

- Implementasikan form `Add New Food` sehingga ketika di submit bisa melakukan post ke server.
- Untuk menu select list field tag, berikan tiga pilihan berupa : **ayam, ikan, dan other**

## **Release 3 - Fetch Logged In User Food Menu**

### **Client**

Todo :

- Tampilkan menu foods milik user yang sedang login di client kalian. 

### **Server**

Buatlah endpoint untuk mendapatkan foods sesuai dengan ketentuan sebagai berikut:

- route:
  - `GET /foods`
- request
  - headers
    - `{ access_token }`
- response
  - `200`: `[{ "id": 1, "title": "Ayam Bakar Madu", "price": 10000, "ingredients": "Ayam, Madu, Kecap", "tag": "ayam", "UserId": 1 }, ...]`

notes :

- Pastikan **hanya** user yang sedang login yang dapat mendapatkan data foods dan hanya foods dengan UserId sesuai user yang login.

## **Release 4 - Delete Food**

### **Server**

Buatlah endpoint untuk menghapus food dari user yang sedang login dengan ketentuan sebagai berikut:

- route:
  - `DELETE /foods/:id`
- request
  - headers
    - `{ access_token }`
- response:
  - `200`: `{ "message": "Successfully delete food from your menu"  }`

notes : 
- Pastikan disisi server maupun client user **HANYA** bisa menghapus food miliknya sendiri (Authorization)

### **Client**

- Implementasikan button `Remove` yang terdapat pada setiap foods.
- Pada saat tombol `Remove` di click, maka foods akan langsung terhapus baik dari sisi client maupun server
