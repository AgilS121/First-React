import './App.css';
import React  from 'react';
import ModalCreate from './component/ModalCreate';

// penggunaan class component, untuk lebih lengkap cari tahu apa perbedaan kelas komponen dan fungsi komponen di react js
class App extends React.Component {
  // class component memerlukan constructor yang dimana dia dibaca langsung atau dibaca untuk pertama kalinya
  constructor() {
    super();

    this.state = {
      sisaUang: 0,
      persentaseUang : 0,
      pemasukanUang : 0,
      pengeluaranUang : 0,
      transaksiIN : 0,
      transaksiOUT : 0,
      summary : [
        {
          deskripsi : 'Menerima Gaji',
          tanggal : '1 July 2021',
          nominal : 1000000,
          category : 'IN'
        },
        {
          deskripsi : 'Makan Nasi Padang',
          tanggal : '1 July 2021',
          nominal : 20000,
          category : 'OUT'
        }
      ]
    }

    this.tambahItem = this.tambahItem.bind(this);
    this.fnHitung = this.fnHitung.bind(this);
  }

  tambahItem(objek) {
    // ' ... ' spreed syntax atau mengkopy data
    // mdal melempar data ke objek
    let newData = [...this.state.summary, objek]

    // mmbuat variabel data uang sebagai wadah yang telah memfilter dimana kategri IN
    let dataUangIN = newData.filter( (item) => item.category === 'IN')
    // membuat variabel nominal , sebagai wadah nominal diatas kemudia dibuat menjadi array baru menggunakan map
    let nominalUang = dataUangIN.map( (item)=> item.nominal );
    // menjumlahkan di array dengan methde reduce. ketika hanya ada 1 array di value tambahkan koma 0
    let jumlahUang = nominalUang.reduce((total, num)=> total + num,0)

    let dataUangOut = newData.filter( (item) => item.category === 'OUT')
    let nominalUangOut = dataUangOut.map( (item) => item.nominal )
    let jumlahUangOut = nominalUangOut.reduce( (total, num)=> total + num,0)

    this.setState({
      pemasukanUang : jumlahUang,
      transaksiIN : nominalUang.length,
      pengeluaranUang : jumlahUangOut,
      transaksiOUT : nominalUangOut.length,
      sisaUang : jumlahUang - jumlahUangOut,
      persentaseUang : (jumlahUang - jumlahUangOut) / jumlahUang * 100,
      summary : newData
    })
  }

  fnHitung() {
    // mmbuat variabel data uang sebagai wadah yang telah memfilter dimana kategri IN
    let dataUangIN = this.state.summary.filter( (item) => item.category === 'IN' )
    // membuat variabel nominal , sebagai wadah nominal diatas kemudia dibuat menjadi array baru menggunakan map
    let nominalUang = dataUangIN.map( (item)=> item.nominal );
    // menjumlahkan di array dengan methde reduce
    let jumlahUang = nominalUang.reduce((total, num)=> total + num)

    let dataUangOut = this.state.summary.filter( (item) => item.category === 'OUT')
    let nominalUangOut = dataUangOut.map( (item) => item.nominal )
    let jumlahUangOut = nominalUangOut.reduce( (total, num)=> total + num)

    this.setState({
      pemasukanUang : jumlahUang,
      transaksiIN : nominalUang.length,
      pengeluaranUang : jumlahUangOut,
      transaksiOUT : nominalUangOut.length,
      sisaUang : jumlahUang - jumlahUangOut,
      persentaseUang : (jumlahUang - jumlahUangOut) / jumlahUang * 100
    })
  }

  // dibaca pertama kali sebelum render
  // disini digunakan untuk menghitung sisa uang
  componentDidMount() {
    if(this.state.summary.length < 1 ){
      console.log('OK')
    } else {
    this.fnHitung();
    }
  }

  // render adalah dimana kita menuliskan kontent yang akan dibuat atau ditampilkan dalam program
  render(){
    return (
      <> 
        <div className='container py-5'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h1 className='fw-bold'>FEEDUITEN APPS</h1>
              <hr className='w-75 mx-auto' />
              <h2 className='fw-bold'>Rp. {this.state.sisaUang},-</h2>
              <span className='title'>Sisa uang kamu tersisa {this.state.persentaseUang}% lagi</span>
            </div>
          </div> 

          <div className='row mt-4'>
            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper mb-1'>
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className='title-sm'>Pemasukan</span>
                <h3 className='fw-bold'>Rp. {this.state.pemasukanUang},-</h3>
                <span className='title-sm text-ungu fw-bold'> {this.state.transaksiIN} </span><span className='title-sm'>Transaksi</span>
              </div>
            </div>

            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper mb-1'>
                  <i className="bi bi-cash-stack"></i>
                </div>
                <span className='title-sm'>Pemakaian</span>
                <h3 className='fw-bold'>Rp. {this.state.pengeluaranUang},-</h3>
                <span className='title-sm text-ungu fw-bold'> {this.state.transaksiOUT} </span><span className='title-sm'>Transaksi</span>
              </div>
            </div>

          </div>

          <div className='row mt-4'>
            <div className='col-12 d-flex justify-content-between align-items-center'>
              <h4>Ringkasan Transaksi</h4>
              <div className='wrapper-button d-flex text-white'>
                <ModalCreate action={this.tambahItem} category="IN" variant="button btn-ungu px-3 py-2 me-2" text="Pemasukan" icon="bi bi-plus-circle-fill" modalheading="Tambah Pemasukan" />
                <ModalCreate action={this.tambahItem} category="OUT" variant="button btn-pink px-3 py-2" text="Pengeluaran" icon="bi bi-dash-circle-fill" modalheading="Tambah Pengeluaran" />
              </div>
            </div>
          </div>

          <div className='row mt-4'>
            { this.state.summary.length < 1  &&  <Alert />}
            { this.state.summary.map((sum, index) => {
              return (
                <div key={index} className='mb-3 col-12 d-flex align-items-center justify-content-between'>
                  <div className='d-flex align-items-center'>
                  <div className={sum.category === 'IN' ? 'icon-wrapper-in' : 'icon-wrapper-out'}>
                    <i className={sum.category === 'IN' ? 'bi bi-wallet2' : 'bi bi-bag-dash'}></i>
                  </div>

                  <div className='transaction ms-3 d-flex flex-column'>
                    <h6>{sum.deskripsi}</h6>
                    <span className='title-sm'>{sum.tanggal}</span>
                  </div>
                  </div>
                  <h5 className={sum.category === 'IN' ? 'text-money-in' : 'text-money-out'}>Rp. {sum.nominal}</h5>
                </div>
              )
            }) }
            

            
          </div>
        </div>
      </>
    );
  }
}

class Alert extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
      <h1>Data Masih Kosong </h1>
    )
  }
}

export default App;
