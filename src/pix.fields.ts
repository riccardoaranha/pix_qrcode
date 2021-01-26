import * as Config from './pix.config'
import * as Utils from './pix.utils';

//Generic Field Definitions

interface IField<T> {
	ID : string;
	Value : T;
	TextValue : string;
	Min_length : int;
	Max_length : int;

	setValue(value : T) : void;
	validate() : void;
	to_message() : string;
}

abstract class Field<T> implements IField<T> {
	constructor(id : string, value : T = undefined, min_length : int = undefined, max_length : int = undefined) {
		this.ID = id;
		this.Min_length = min_length;
		this.Max_length = max_length;
		this.setValue(value);
	}

	setValue(value : T) : void;

	validate() : void {
		if (this.ID.length != Config.ID_LENGHT)
		{ throw new Error('PIX_Error: Invalid ID in PIX_Field.'); }

		if ((this.Min_length !== undefined && this.TextValue.length < this.Min_length) || 
			(this.Max_length !== undefined && this.TextValue.length > this.Max_length))
		{ throw new Error('PIX_Error: Invalid Data in PIX_Field.'); }
	}

	to_message() :string {
		if (Config.ValidationType == Config.ValidationTypes.Full)
		{ this.validate(); }
		return this.ID + Utils.zeroPad(this.TextValue.length, 2) + this.TextValue;
	}
}

class StrField extends Field<string> {
	constructor(id : string, value : string = '', min_length : int = undefined, max_length : int = undefined) {
		super(id, value, min_length, max_length);
	}

	setValue(value : string) : void {
		this.Value = value;
		this.TextValue = value;
		if (Config.ValidationType == Config.ValidationTypes.Full)
		{ this.validate(); }
	}
}

class IntField extends Field<int> {
	constructor(id : string, value : int, min_length : int = undefined, max_length :int = undefined, min_value : int = undefined, max_value : int = undefined) {
		super(id, value, min_length, max_length);
		this.Min_Value = min_value;
		this.Max_Value = max_value;
		this.setValue(value);
	}

	validate() : void {
		Field.prototype.validate.call(this);
		if ((this.Min_Value != undefined && this.Value < this.Min_Value) || 
			(this.Max_Value != undefined && this.Value > this.Max_Value))
		{ throw new Error('PIX_Error: Invalid Data in PIX_IntField.'); }
	}

	setValue(value : int) : void {
		this.Value = value;
		this.TextValue = value.toString();
		if (Config.ValidationType == Config.ValidationTypes.Full)
		{ this.validate(); }
	}
}

class FloatField extends Field<float> {
	constructor(id : string, value : float, min_length = undefined, max_length = undefined, min_value : float = undefined, max_value : float = undefined, decimals : int = 2) {
		super(id, value, min_length, max_length);
		this.Min_Value = min_value;
		this.Max_Value = max_value;
		this.Decimals = decimals
		this.setValue(value);
	}

	validate() : void {
		Field.prototype.validate.call(this);
		if ((this.Min_Value != undefined && this.Value < this.Min_Value) || 
			(this.Max_Value != undefined && this.Value > this.Max_Value))
		{ throw new Error('PIX_Error: Invalid Data in PIX_FloatField.'); }
	}

	setValue(value : int) : void {
		this.Value = value;
		this.TextValue = value.toFixed(this.Decimals);
		if (Config.ValidationType == Config.ValidationTypes.Full)
		{ this.validate(); }
	}
}

//Specific  Field Definitions
class Payload_Format_Indicator     extends StrField   { constructor(value : string = '01')      { super('00', value, 2, 2); }}
class Point_Of_Initiation_Method   extends StrField   { constructor(value : string = '11')      { super('01', value, 2, 2); }} //TODO: dictionary of accepted values
class Merchant_Account_Information extends StrField   { constructor(id: string, value : string) { super(id, value, 1, 99); }} 
class Merchant_Category_Code       extends StrField   { constructor(value : string = '0000')    { super('52', value, 4, 4); }} //TODO: dictionary of accepted values
class Transaction_Currency         extends StrField   { constructor(value : string = '983')     { super('53', value, 3, 3); }} //TODO: dictionary of accepted values
class Transaction_Amount           extends FloatField { constructor(value : float)              { super('54', value, 1, 13, 0, 9999999999.99, 2); }}
class Country_Code                 extends StrField   { constructor(value : string = 'BR')      { super('58', value, 2, 2); }}
class Merchant_Name                extends StrField   { constructor(value : string)             { super('59', value, 1, 25); }}
class Merchant_City                extends StrField   { constructor(value : string)             { super('60', value, 1, 15); }}
class Postal_Code                  extends StrField   { constructor(value : string)             { super('61', value, 1, 99); }}
class CRC16                        extends StrField   { constructor()                           { super('63', '', 4, 4); }
	setValue(value : string) {
		this.Value = value;
		this.TextValue = Utils.computeCRC(this.Value + this.ID + '04');
	}
}
class Additional_Data_Field        extends StrField   { constructor(id: string, value : string) { super(id, value, 1, 99); }} 
class Unreserved_Templates         extends StrField   { constructor(id: string, value : string) { super(id, value, 1, 99); }} 

export { IField, Field, StrField, IntField, FloatField, Payload_Format_Indicator, Point_Of_Initiation_Method, Merchant_Account_Information,
Merchant_Category_Code, Transaction_Currency, Transaction_Amount, Country_Code, Merchant_Name, Merchant_City, Postal_Code, CRC16, 
Additional_Data_Field, Unreserved_Templates }