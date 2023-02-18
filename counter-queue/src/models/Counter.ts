import mongoose, { Document, Schema } from 'mongoose';

export interface ICounter {
    num: number;
    name: string;
    status: boolean;
    current: number;
    history: [number];
}

export interface ICounterModel extends ICounter, Document {}

const CounterSchema: Schema = new Schema(
    {
        num: { type: Number, required: true },
        name: { type: String, required: true },
        status: { type: Boolean, required: true },
        current: { type: Number, required: true },
        history: { type: [Number], required: true }
    },
    { versionKey: false }
);

export default mongoose.model<ICounterModel>('Counter', CounterSchema);