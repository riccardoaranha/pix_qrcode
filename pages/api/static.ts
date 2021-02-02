import type { NextApiRequest, NextApiResponse } from 'next';
import util from 'util';
import * as PIX from '../../lib/pix';

interface IStaticParams {
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

function GenerateStatic(params : IStaticParams) : PIX.Messages.Static {
	let message = new PIX.Messages.Static(params.key, params.merchant_name, params.merchant_city);
	if (params.point_of_initiation_method !== undefined)
	{ message.setField(new PIX.Fields.Point_Of_Initiation_Method(params.point_of_initiation_method)); }
	if (params.merchant_category_code !== undefined)
	{ message.setField(new PIX.Fields.Merchant_Category_Code(params.merchant_category_code)); }
	if (params.transaction_amount !== undefined) 
	{ message.setField(new PIX.Fields.Transaction_Amount(params.transaction_amount)); }
	if (params.additional_info !== undefined) { 
		let grp : PIX.Groups.Grp_Merchant_Account_Information = message.getField(PIX.Groups.Grp_Merchant_Account_Information);
		grp.Children.push(new PIX.Fields.Merchant_Account_Information('02', params.additional_info));
		message.setField(grp);
	}
	if (params.reference_label !== undefined) {
		let grp : PIX.Groups.Grp_Additional_Data_Field = new PIX.Groups.Grp_Additional_Data_Field();
		grp.Children.push(new PIX.Fields.Additional_Data_Field('05', params.reference_label));
		message.setField(grp);
	}
	if (params.postal_code !== undefined) 
	{ message.setField(new PIX.Fields.Postal_Code(params.postal_code)); }
	return message;

}

export default (req : NextApiRequest, res : NextApiResponse) => {
	try {
		let params : IStaticParams;
		if (typeof req.body === 'string')
		{ params = JSON.parse(req.body); }
		else 
		{ params = req.body; }
		
		let msg : PIX.Messages.Static = GenerateStatic(params);
		msg.validate();
		
		return new Promise<void>((resolve, reject) => {
			try {
			//PIX.QRCode.toPNG(msg.getStringValue(), function (data : Buffer) : void {
			PIX.QRCode.toDataURL(msg.getStringValue(), function (data : string) : void {
				res.status(200);
				//res.setHeader('Content-Type', 'image/png');
				res.setHeader('Content-Type', 'text/plain');
				res.setHeader('Cache-Control', 's-maxage=10, stale-while=revalidate');
				res.write(data);
				res.end();
				resolve();
			});
			}
			catch(error) {
				res.status(200);
				res.setHeader('Content-Type', 'text/plain');
				res.write('nao sei o que aconteceu');
				res.write(error.stack);
				res.write(util.inspect(req));
				//res.write(data);
			}
		});
	}
	catch (error) {
		res.status(400);
		res.write('Invalid request.\r\n');
		res.write('\r\n');
		res.write('Input:\r\n');
		res.write(req.body);
		res.write('\r\n');
		res.write('Treated Input:\r\n');
		res.write(util.inspect(req));
		res.write('\r\n');
		res.write('\r\n');
		res.write(error.stack);
		if (error instanceof PIX.Utils.PIXError)
		{ res.write(error.contents); }
		res.end();
	}
}

