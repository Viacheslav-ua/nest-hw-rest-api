import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { getContactDto } from './dto/get-contact.dto';
import { Contact, ContactDocument } from './schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}
  async create(bodyDto: CreateContactDto): Promise<Contact> {
    const contact = await this.contactModel.create(bodyDto);
    return contact;
  }
  async getAll(queryDto: getContactDto): Promise<Contact[]> {
    const {
      sortBy,
      sortByDesc,
      filter,
      favorite,
      page = '1',
      limit = '20',
    } = queryDto;
    let skip = 0;
    if (parseInt(page) >= 1) {
      skip = (parseInt(page) - 1) * parseInt(limit);
    }
    const total = await this.contactModel.find().countDocuments();
    let query: any;
    if (favorite) {
      query = this.contactModel.find({ favorite: favorite });
    } else {
      query = this.contactModel.find();
    }

    let sortCriteria = null;
    if (sortBy) {
      sortCriteria = { [`${sortBy}`]: 1 };
    }
    if (sortByDesc) {
      sortCriteria = { [`${sortByDesc}`]: -1 };
    }
    if (filter) {
      query.select(filter.split('|').join(' '));
    }
    const result = await query
      .limit(parseInt(limit))
      .skip(skip)
      .sort(sortCriteria);
    return result;
  }
  async getOne(id: ObjectId): Promise<Contact> {
    const contact = await this.contactModel.findOne({ _id: id });
    return contact;
  }
  async delete(id: ObjectId): Promise<Contact> {
    const contact = await this.contactModel.findOneAndDelete({ _id: id });
    return contact;
  }
  async update(id: ObjectId, bodyDto: UpdateContactDto) {
    const contact = await this.contactModel.findOneAndUpdate(
      { _id: id },
      bodyDto,
      { new: true },
    );
    return contact;
  }
}
