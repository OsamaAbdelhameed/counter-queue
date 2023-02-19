import { ObjectId } from "bson";

export interface Customer {
	_id: ObjectId;
	branchNo: number;
	lastIssued: number;
	inProgress: [number];
	queue: [number];
}
