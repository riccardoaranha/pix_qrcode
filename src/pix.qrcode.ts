import * as Utils from './pix.utils';
import QRCode from 'qrcode';

function toDataURL(msg : string, callback : (string) => void) : void {
	QRCode.toDataURL(msg, function (err, url) {
		var base64Data = url;
		var imageBuffer = Utils.decodeBase64Image(base64Data);
		callback(imageBuffer.data);
	});
}

function toPNG(msg : string, callback : (Buffer) => void) : void {
	QRCode.toDataURL(msg, function (err, url) {
		var base64Data = url;
		var imageBuffer = Utils.decodeBase64Image(base64Data);
		callback(imageBuffer.data);
	});
}

export { toDataURL, toPNG }