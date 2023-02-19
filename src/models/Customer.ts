import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomer {
    branchNo: Number;
    lastIssued: Number;
    inProgress: [Number];
    queue: [Number];
}

export interface ICustomerModel extends ICustomer, Document {}

const CustomerSchema: Schema = new Schema(
    {
        branchNo: { type: Number, required: true },
        lastIssued: { type: Number, required: true },
        inProgress: { type: [Number], required: true },
        queue: { type: [Number], required: true }
    },
    { versionKey: false }
);

export default mongoose.model<ICustomerModel>('Customer', CustomerSchema);