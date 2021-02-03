import Head from 'next/head'
import React from 'react';
import Image from 'next/image';
import { API_PIX, IStaticParams } from './PIX';
import { throws } from 'assert';

var initialImg = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="

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
<div className="container" id="maincontainer">
    <Head>
        <title>QR Code Estático</title>
    </Head>
    <div id="form-qrcode-static" className="form-qrcode">
        <h2>QR Code Estático</h2>
        <Image 
            src= {this.state.imgsrc} 
            width="150" height="150">
        </Image>

        <form onSubmit={this.getQRCode}>              
            <fieldset>
                <label htmlFor="key">Chave PIX</label>
                <input type="text" id="key" name="key" placeholder="Chave PIX"
                minLength={1} maxLength={99} 
                value={this.state.key} onChange={this.handleInputChange} required />
            </fieldset>
            <fieldset>
                <label htmlFor="merchant_name">Nome do Recebedor</label>
                <input type="text" id="merchant_name" name="merchant_name" placeholder="Nome do Recebedor"
                minLength={1} maxLength={25} 
                value={this.state.merchant_name} onChange={this.handleInputChange} required />
            </fieldset>
            <fieldset>
                <label htmlFor="merchant_city">Nome do Recebedor</label>
                <input type="text" id="merchant_city" name="merchant_city" placeholder="Cidade do Recebedor"
                minLength={1} maxLength={15} 
                value={this.state.merchant_city} onChange={this.handleInputChange} required />
            </fieldset>
            <fieldset>
                <label htmlFor="transaction_amount"> Valor</label>
                <input type="number" id="transaction_amount" name="transaction_amount" placeholder="Valor da transação"
                min={0.01} max={999999999.99} step={0.01}
                value={this.state.transaction_amount} onChange={this.handleInputChange} />
            </fieldset>
            <fieldset>
                <label htmlFor="additional_info">Mensagem</label>
                <input type="text" id="additional_info" name="additional_info" placeholder="Mensagem"
                minLength={1} maxLength={72} 
                value={this.state.additional_info} onChange={this.handleInputChange} />
            </fieldset>
            <fieldset>
                <label htmlFor="point_of_initiation_method">QR Reutilizável?</label>
                <select id="point_of_initiation_method" name="point_of_initiation_method"
                value={this.state.point_of_initiation_method} onChange={this.handleInputChange}>
                    <option value="" disabled hidden>Escolha</option>
                    <option value="11">Sim</option>
                    <option value="12">Não</option>
                </select>
            </fieldset>
            <fieldset>
                <button type="submit">Submit</button>
            </fieldset>
        </form>
    </div>
</div>
        );
    }    
}

export default Static