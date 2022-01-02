import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      return ret;
    },
  },
  toObject: { virtuals: true },
})
export class Contact {
  @Prop({ required: [true, 'Set name for contact'] })
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ default: false })
  favorite: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  owner: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
