import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { createContactDto } from './dto/create-contact.dto';
import { Contact, ContactDocument } from './schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}
  async create(dto: createContactDto): Promise<Contact> {
    const contact = await this.contactModel.create(dto);
    return contact;
  }
  async getAll(): Promise<Contact[]> {
    const contacts = await this.contactModel.find();
    return contacts;
  }
  async getOne(id: ObjectId): Promise<Contact> {
    const contact = await this.contactModel.findOne({ _id: id });
    return contact;
  }
  async delete(id: ObjectId): Promise<Contact> {
    const contact = await this.contactModel.findOneAndDelete({ _id: id });
    return contact;
  }
  async update(id: ObjectId, dto: createContactDto) {
    const contact = await this.contactModel.findOneAndUpdate({ _id: id }, dto, {
      new: true,
    });
    return contact;
  }
}
