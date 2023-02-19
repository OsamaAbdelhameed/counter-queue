import { ObjectId } from "bson";

export interface Counter {
	_id: ObjectId;
	num: number;
	name: string;
	status: boolean;
	online: boolean;
	current: number;
	history: number[];
}