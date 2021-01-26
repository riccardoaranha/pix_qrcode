import type { NextApiRequest, NextApiResponse } from 'next';
import * as PIX from './../../src/pix';

//export default (req: NextApiRequest, res: NextApiResponse) => {
export default (req : NextApiRequest, res : NextApiResponse) => {
	var texto = '00020101021126440014br.gov.bcb.pix0122fulano2019@example.com5204000053039865802BR5913FULANO DE TAL6008BRASILIA6304DFE3';
	res.write(req.body);
	res.end();
	return;

	return new Promise((resolve, reject) => {
		PIX.QRCode.toPNG(texto, function (data) {
			res.setHeader('Content-Type', 'image/png');
			res.setHeader('Cache-Control', 's-maxage=10, stale-while=revalidate');
			res.write(data);
			res.end();
			resolve();
		});
	});
}
