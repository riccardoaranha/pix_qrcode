import * as Config from './pix.config'
import * as Utils from './pix.utils';
import * as Fields from './pix.fields';

class Group<T> implements Fields.IField<U> {
	ID : string;
	Children : Array<T>;

	constructor(id : string) {
		this.ID = id;
		this.Children = new Array<T>();
	}

	validate() : void {
		if (this.ID.length != Config.ID_LENGHT)
		{ throw new Error('PIX_Error: Invalid ID in Group.'); }
		
		if (this.Children.length == 0)
		{ throw new Error('PIX_Error: Empty Group.'); }
	}

	to_message () : string {
		if (Config.ValidationType == Config.ValidationTypes.Full)
		{ this.validate(); }
		var content = '';
		this.Children.forEach(function(item) {
			content = content + item.to_message();
		});
		return this.ID + content.length + content;
	}
	
	setValue(value : U) : void {
		throw new Error('PIX_Error: Invalid operation - can not set a value to a group.'); 
	}
}

// Specific Group Field Definitions
class Grp_Merchant_Account_Information extends Group<Merchant_Account_Information> {
	constructor() {
		super('26');
		this.Children.push(new Fields.Merchant_Account_Information('00', 'br.gov.bcb.pix'));
	}
}

class Grp_Additional_Data_Field extends Group<Additional_Data_Field> {
	constructor() { super('62'); } 
}

class Grp_Unreserved_Templates extends Group<Unreserved_Templates> {
	constructor(id : string) { 
		if (id < '80' || id > '99')
		{ throw new Error('PIX_Error: Invalid ID for Grp_Unreserved_Templates'); }
		super(id); 
	}
}

export { Group, Grp_Merchant_Account_Information, Grp_Additional_Data_Field, Grp_Unreserved_Templates };