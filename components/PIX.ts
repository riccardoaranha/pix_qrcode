import axios from 'axios';

export const API_PIX = axios.create({
	baseURL: process.env.API_URL
});

export interface IStaticParams {
	//Mandatory required fields 
	key : string, 
	merchant_name : string,
	merchant_city : string,
	//Mandatory fields that can change, but have default value
	point_of_initiation_method? : string,
	merchant_category_code? : string,
	//Optional Fields
	transaction_amount? : number, 
	additional_info? : string, 
	reference_label? : string,
	postal_code? : string
}
