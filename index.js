const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')
const admin = require("firebase-admin")
const credentials = require("./maifan-firebase-adminsdk-fz2rh-05564c0aae.json")
const otp = Math.floor(100000 + Math.random() * 900000);

app.use(bodyParser.json())

admin.initializeApp({
  credential:admin.credential.cert(credentials)

})

app.post('/auth', async (req,res) => {
  const userResponse = await admin.auth().createUser({
    email:req.body.email,
    password:req.body.password,
    emailVerified:false,
    disabled:false
  })
  res.json(userResponse)
})

app.get('/login', (req, res) => {
  const sql = "SELECT * FROM tb_customer"
  db.query(sql, (error, result) => {
    console.log(result)
    response('200', result, "get all row table", res)
  })
})

app.post('/register', (req, res) => {
  const {nomer_telepon, auth_otp} = req.body

  const sql = `INSERT INTO tb_customer (id, kode_customer, username, nama, alamat, nomer_telepon, tempat_lahir, tanggal_lahir, jenis_kelamin, tanggal_daftar,
    ref_tamu, id_cabang, id_status_member, tanggal_terakhir_login)
    VALUES (${id}, ${kode_customer}, ${username}, ${nama}, ${nomer_telepon}, ${tempat_lahir}, ${tanggal_lahir}, ${jenis_kelamin}, ${tanggal_daftar}, ${ref_tamu}, ${id_cabang}, ${id_status_member}, ${ref_tamu}, ${tanggal_terakhir_login})`
    
  if (auth_otp == otp) {
    db.query(sql, (error, result) => {
      response('200', result, "insert data customer", res)
    })
  } 
  else
  {
    response('400', result, "gagal insert", res)
  }
})


app.get('/barang', (req, res) => {
  const sql = "SELECT * FROM tb_barang"
  db.query(sql, (error, result) => {
    console.log(result)
    response('200', result, "get all row table", res)
  })
})

app.post('/barang/update', (req, res) => {
  const{id, id_cabang, nama_produk, id_kategori, stok, harga, tanggal_input} = req.body

  const sql = `INSERT INTO tb_barang (id, id_cabang, nama_produk, id_kategori, stok, harga, tanggal_input) 
  VALUES (${id}, ${id_cabang},${nama_produk},${id_kategori},${stok},${harga},${tanggal_input})`
  db.query(sql, (error, result) => {
    response('200', result, "get all row table", res)
  })
})
  
app.get('/', (req, res) => {
  const sql = "SELECT * FROM inventory"
  db.query(sql, (error, result) => {
    console.log(result)
    response('200', result, "get all row table", res)
  })
})

app.post('/inventory', (req, res) => {
  const{id, name} = req.body

  const sql = `INSERT INTO inventory (id, name) VALUES (${id}, '${name}')`
  db.query(sql, (error, result) => {
    response('200', result, "get all row table", res)
  })
})


app.listen(port, () => {
  console.log(`${port}`)
})
