import * as PIX from './../../src/pix'

async function Test(request, response) {
	/*console.log('Test 01');
	var test01 = new PIX.Fields.StrField('00', '01');
	console.log(test01);
	console.log(test01.to_message());
	
	console.log('Test 02');
	var test02 = new PIX.Fields.IntField('01', 42);
	console.log(test02);
	console.log(test02.to_message());

	console.log('Test 03');
	var test03 = new PIX.Fields.FloatField('02', 1243.17);
	console.log(test03);
	console.log(test03.to_message()); 

	console.log('Test 04');
	var test04 = new PIX.Fields.Payload_Format_Indicator();
	console.log(test04);
	console.log(test04.to_message());

	console.log('Test 05');
	var test05 = new PIX.Groups.Grp_Merchant_Account_Information();
	console.log(test05);
	console.log(test05.to_message());
	test05.Children.push(new PIX.Fields.Merchant_Account_Information('01', 'fulano2019@example.com'));
	console.log(test05);
	console.log(test05.to_message());*/

	console.log('Test 06');
	var test06 = new PIX.Messages.Static('fulano2019@example.com', 'FULANO DE TAL', 'BRASILIA');
	test06.setField(new PIX.Fields.Transaction_Amount(1234.17));
	console.log(test06);
	console.log(test06.to_message());
	
	return new Promise((resolve, reject) => {
		PIX.QRCode.toPNG(test06.to_message(), function (data) {
			response.setHeader('Content-Type', 'image/png');
			response.setHeader('Cache-Control', 's-maxage=10, stale-while=revalidate');
			response.write(data);
			response.end();
			resolve();
		});
	});
	
	//response.write('acabou');
}

export default Test;