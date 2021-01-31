import * as Config from './pix.config'
import * as Utils from './pix.utils';
import * as Fields from './pix.fields';

class Group<T extends Fields.IField<any>> implements Fields.IField<undefined> {
	ID : string;
	Value : undefined;
	TextValue : string;
	Min_length : number;
	Max_length : number;
	Children : Array<T>;

	constructor(id : string, min_length : number = -1, max_length : number = -1) {
		this.ID = id;
		this.Value = undefined;
		this.TextValue = '';
		this.Min_length = min_length;
		this.Max_length = max_length;
		this.Children = new Array<T>();
	}

	validate() : void {
		if (this.ID.length != Config.ID_LENGHT)
		{ throw new Error('PIX_Error: Invalid ID in Group.'); }
		
		if (this.Children.length == 0)
		{ throw new Error('PIX_Error: Empty Group.'); }

		var content = '';
		this.Children.forEach(function(item) {
			item.validate();
			content = content + item.toString();
		});
		content = this.ID + content.length + content;
	
		if (Config.ValidationType == Config.ValidationTypes.Full)
		{
			if ((this.Min_length != -1 && content.length < this.Min_length) || 
				(this.Max_length != -1 && content.length > this.Max_length))
			{ throw new Error('PIX_Error: Invalid data lenght in PIX_Group'); }
		}
	}

	toString () : string {
		if (Config.ValidationType == Config.ValidationTypes.Full)
		{ this.validate(); }
		var content = '';
		this.Children.forEach(function(item) {
			content = content + item.toString();
		});
		content = this.ID + content.length + content;

		return content;
	}
	
	setValue(value : undefined) : void {
		throw new Error('PIX_Error: Invalid operation - can not set a value to a group.'); 
	}
}

// Specific Group Field Definitions
class Grp_Merchant_Account_Information extends Group<Fields.Merchant_Account_Information> {
	constructor() {
		super('26', 5, 99);
		this.Children.push(new Fields.Merchant_Account_Information('00', 'br.gov.bcb.pix'));
	}
}

class Grp_Additional_Data_Field extends Group<Fields.Additional_Data_Field> {
	constructor() { super('62', 1, 99); } 
}

class Grp_Unreserved_Templates extends Group<Fields.Unreserved_Templates> {
	constructor(id : string) { 
		if (id < '80' || id > '99')
		{ throw new Error('PIX_Error: Invalid ID for Grp_Unreserved_Templates'); }
		super(id, 1, 99); 
	}
}

export { Group, Grp_Merchant_Account_Information, Grp_Additional_Data_Field, Grp_Unreserved_Templates };