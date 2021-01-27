import * as Config from './pix.config';
import * as Utils from './pix.utils';
import * as Fields from './pix.fields';
import * as Groups from './pix.groups';


enum FieldRequirements {
	Optional = "O",
	Mandatory = "M",
	Conditional = "C",
};

class AcceptedFieldDefinitions {
	Order : number = -1;
	Requirement : FieldRequirements = FieldRequirements.Optional;
}

class MessageFields {
	Order : number;
	Field : Fields.IField<any>;
	constructor (order : number, field : Fields.IField<any>) {
		this.Order = order;
		this.Field = field;
	}
}

class Message {
	AcceptedFieldList: Map<any, AcceptedFieldDefinitions> = new Map();
	FieldList : Array<MessageFields> = new Array<MessageFields>();

	// ToDo: Implement this method
	validate() : void {
	}

	to_message() : string {
		if (Config.ValidationType == Config.ValidationTypes.Full)
		{ this.validate(); }
		let msg : string = '';
		for(let item of this.FieldList)
		{ 
			if (item instanceof Fields.CRC16)
			{ item.setValue(msg); }
			msg = msg + item.Field.to_message(); 
		}
		return msg;
	}

	existsField(field_type : any) : boolean {
		this.FieldList.forEach(function(field) {
			if (field instanceof field_type) 
			{ return true; }
		});
		return false;
	}
	
	getField(field_type : any) : Fields.IField<any> {
		this.FieldList.forEach(function(field) {
			if (field instanceof field_type) 
			{ return field; }
		});
		throw new Error("PIX_Error: Field not found");
	}
	
	setField(field : Fields.IField<any>, order_override : number = -1) {
		let accepted : boolean = false;
		var order : number = order_override;

		this.AcceptedFieldList.forEach((value: AcceptedFieldDefinitions, key: any) => {
			if (field instanceof key) {
				accepted = true; 
				order = value.Order;
			}
		});

		if (!accepted)
		{ throw new Error('PIX_Error: Field not accepted in this message.'); }

		let existing_index : number = -1;
		this.FieldList.forEach(function(item, index) {
			if (order == item.Order) 
			{ existing_index = index }
		});
		if (existing_index != -1)
		{ this.FieldList.splice(existing_index); }
		this.FieldList.push(<MessageFields>{Order : order, Field : field });
		this.FieldList.sort((a, b) => (a.Order > b.Order) ? 1 : -1);
	}

}

class Static extends Message {
	AcceptedFieldList : Map<any, AcceptedFieldDefinitions> = new Map<any, AcceptedFieldDefinitions>([
		[Fields.Payload_Format_Indicator,         <AcceptedFieldDefinitions>{Order: 0,  Requirement: FieldRequirements.Mandatory}], 
		[Fields.Point_Of_Initiation_Method,       <AcceptedFieldDefinitions>{Order: 1,  Requirement: FieldRequirements.Optional}],
		[Groups.Grp_Merchant_Account_Information, <AcceptedFieldDefinitions>{Order: 2,  Requirement: FieldRequirements.Mandatory}],
		[Fields.Merchant_Category_Code,           <AcceptedFieldDefinitions>{Order: 3,  Requirement: FieldRequirements.Mandatory}],
		[Fields.Transaction_Currency,             <AcceptedFieldDefinitions>{Order: 4,  Requirement: FieldRequirements.Mandatory}],
		[Fields.Transaction_Amount,               <AcceptedFieldDefinitions>{Order: 5,  Requirement: FieldRequirements.Optional}],
		[Fields.Country_Code,                     <AcceptedFieldDefinitions>{Order: 6,  Requirement: FieldRequirements.Mandatory}],
		[Fields.Merchant_Name,                    <AcceptedFieldDefinitions>{Order: 7,  Requirement: FieldRequirements.Mandatory}],
		[Fields.Merchant_City,                    <AcceptedFieldDefinitions>{Order: 8,  Requirement: FieldRequirements.Mandatory}],
		[Fields.Postal_Code,                      <AcceptedFieldDefinitions>{Order: 9,  Requirement: FieldRequirements.Optional}],
		[Groups.Grp_Additional_Data_Field,        <AcceptedFieldDefinitions>{Order: 10, Requirement: FieldRequirements.Optional}],
		[Groups.Grp_Unreserved_Templates,         <AcceptedFieldDefinitions>{Order: 11, Requirement: FieldRequirements.Optional}],
		[Fields.CRC16,                            <AcceptedFieldDefinitions>{Order: 12, Requirement: FieldRequirements.Mandatory}]
	]);

	constructor(key : string, merchant_name : string, merchant_city : string) {
		super();
		this.setField(new Fields.Payload_Format_Indicator());
		this.setField(new Fields.Point_Of_Initiation_Method());
		var grp : Groups.Grp_Merchant_Account_Information = new Groups.Grp_Merchant_Account_Information();
		grp.Children.push(new Fields.Merchant_Account_Information('01', key));
		this.setField(grp);
		this.setField(new Fields.Merchant_Category_Code());
		this.setField(new Fields.Transaction_Currency());
		this.setField(new Fields.Country_Code());
		this.setField(new Fields.Merchant_Name(merchant_name));
		this.setField(new Fields.Merchant_City(merchant_city));
		this.setField(new Fields.CRC16());
		if (Config.ValidationType == Config.ValidationTypes.Full)
		{ this.validate(); }
	}
}

export { FieldRequirements, AcceptedFieldDefinitions, MessageFields, Message, Static};
