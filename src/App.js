import React, { Component } from 'react'
import Axios from 'axios'

const urlApi = 'http://localhost:8080/'

class App extends Component {

  state = {
    namaProduct: '',
    selectedFile: null,
    data: []
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    Axios.get(urlApi + 'getlist')
    .then(res => {
      this.setState({data: res.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  onSubmitClick = () => {
    let fd = new FormData()
    fd.append('aneh', this.state.selectedFile)
    fd.append('name', this.state.namaProduct)
    console.log(fd)
    Axios.post(urlApi + 'uploadimage', fd)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  renderList = () => {
    let render = this.state.data.map((val, index) => {
      return (
        <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>{val.name}</td>
        <td><img style={{width: 100}} src={urlApi + 'files/' + val.image.split('/')[1]} alt="gambar"/></td>
      </tr>
      )
    })
    return render
  }
  

  render() {
    return (
      <div className="container">
        <div className="row text-center mt-5">
          <div className="col">
            <input placeholder="Nama Product" type="text" className="mr-2" 
            value={this.state.namaProduct} 
            onChange={e=> this.setState({namaProduct: e.target.value})}/>
            <input type="file" ref="fileBtn" className="d-none"
            onChange={e => this.setState({selectedFile: e.target.files[0]})}/>
            <input value={ !this.state.selectedFile ? "Select a File" : this.state.selectedFile.name}
            type="button" className="btn btn-primary" 
            onClick={() => this.refs.fileBtn.click()}/>
          </div>
        </div>
        <div className="text-center mt-2">
          <input className="btn btn-success" type="button" value="Submit" onClick={this.onSubmitClick}/>
        </div>

        <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Product</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
            {this.renderList()}
        </tbody>
        </table>
      </div>
    )
  }
}

export default App