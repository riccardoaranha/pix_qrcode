import type { NextApiRequest, NextApiResponse } from 'next';
import * as PIX from './../../src/pix';

//export default (req: NextApiRequest, res: NextApiResponse) => {
export default (req : NextApiRequest, res : NextApiResponse) => {
	console.log(req.body);

	var msg : PIX.Messages.Static = new PIX.Messages.Static('fulano2019@example.com', 'FULANO DE TAL', 'BRASILIA');
	msg.setField(new PIX.Fields.Transaction_Amount(1234.17));

	return new Promise<void>((resolve, reject) => {
		PIX.QRCode.toPNG(msg.to_message(), function (data : Buffer) : void {
			res.setHeader('Content-Type', 'image/png');
			res.setHeader('Cache-Control', 's-maxage=10, stale-while=revalidate');
			res.write(data);
			res.end();
			resolve();
		});
	});
}
