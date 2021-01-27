import * as Utils from './pix.utils';
import QRCode from 'qrcode';

function toDataURL(msg : string, callback : (str : string) => void) : void {
	QRCode.toDataURL(msg, function (err, url) {
		callback(url);
	});
}

function toPNG(msg : string, callback : (buffer : Buffer) => void) : void {
	QRCode.toDataURL(msg, function (err, url) {
		var base64Data = url;
		var imageBuffer = Utils.decodeBase64Image(base64Data);
		callback(imageBuffer);
	});
}

export { toDataURL, toPNG }