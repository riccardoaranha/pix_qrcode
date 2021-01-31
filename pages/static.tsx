import Head from 'next/head'
import React from 'react';
import Image from 'next/image';
import { API_PIX, IStaticParams } from '../components/PIX';
import { throws } from 'assert';
var initialImg = "data:image/jpeg;base64,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"

class Static extends React.Component {
    state = { 
        imgsrc : initialImg,
        key : '',
        merchant_name : '',
        merchant_city : '',
        transaction_amount : '',
        point_of_initiation_method : '',
        additional_info : ''
    };

    constructor(props : any) {
        super(props);    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getQRCode = this.getQRCode.bind(this);
      }


    handleInputChange(event : React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const target = event.target;
        //const value = target.type === 'checkbox' ? target.checked : target.value;        
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
        this.setState({ imgsrc : initialImg});
    }

    getQRCode(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let params : IStaticParams = {key: this.state.key, 
                      merchant_name: this.state.merchant_name, 
                      merchant_city: this.state.merchant_city};
        if (this.state.transaction_amount != '') 
        { params['transaction_amount'] = parseFloat(this.state.transaction_amount); }
        if (this.state.point_of_initiation_method != '')
        { params['point_of_initiation_method'] = this.state.point_of_initiation_method; }
        if (this.state.additional_info != '')
        { params['additional_info'] = this.state.additional_info; }
        API_PIX.post('static', params)
            .then((response) => {
                const {data} = response;
                this.setState({imgsrc : data}); 
            }).catch((e) => {
                //TODO: Improve this interface
                console.log(e);
                alert('Error');
                this.setState({ imgsrc : initialImg});
           });
    }


    render() {
        return(
<div className="container">
    <Head>
        <title>QR Code Estático</title>
    </Head>
    <main>
        <h2 className="title">QR Code Estático</h2>
        <div id="static-qrcode" className="qr-code">
            <Image 
                src= {this.state.imgsrc} 
                width="150" height="150">
            </Image>

            <form onSubmit={this.getQRCode}>              
                <div>
                    <label htmlFor="key">Chave PIX</label>
                    <input type="text" id="key" name="key" placeholder="Chave PIX"
                    minLength={1} maxLength={99} 
                    value={this.state.key} onChange={this.handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="merchant_name">Nome do Recebedor</label>
                    <input type="text" id="merchant_name" name="merchant_name" placeholder="Nome do Recebedor"
                    minLength={1} maxLength={25} 
                    value={this.state.merchant_name} onChange={this.handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="merchant_city">Nome do Recebedor</label>
                    <input type="text" id="merchant_city" name="merchant_city" placeholder="Cidade do Recebedor"
                    minLength={1} maxLength={15} 
                    value={this.state.merchant_city} onChange={this.handleInputChange} required />
                </div>
                <div>
                    <label htmlFor="transaction_amount"> Valor</label>
                    <input type="number" id="transaction_amount" name="transaction_amount" placeholder="Valor da transação"
                    min={0.01} max={999999999.99} step={0.01}
                    value={this.state.transaction_amount} onChange={this.handleInputChange} />
                </div>
                <div>
                    <label htmlFor="additional_info">Mensagem</label>
                    <input type="text" id="additional_info" name="additional_info" placeholder="Mensagem"
                    minLength={1} maxLength={72} 
                    value={this.state.additional_info} onChange={this.handleInputChange} />
                </div>
                <div>
                    <label htmlFor="point_of_initiation_method">QR Reutilizável?</label>
                    <select id="point_of_initiation_method" name="point_of_initiation_method"
                    value={this.state.point_of_initiation_method} onChange={this.handleInputChange}>
                        <option value="" disabled hidden>Escolha</option>
                        <option value="11">Sim</option>
                        <option value="12">Não</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    </main>
</div>
        );
    }    
}

export default Static