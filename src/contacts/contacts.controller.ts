import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { getContactDto } from './dto/get-contact.dto';

// interface ResQuery {
//   sortBy: string;
//   sortByDesc: string;
//   filter: string;
//   page: string;
//   favorite: boolean;
// }

@Controller('/api/contacts')
export class ContactsController {
  constructor(private contactService: ContactsService) {}
  s;
  @Post()
  async create(@Body() dto: CreateContactDto) {
    return await this.contactService.create(dto);
  }

  @Get()
  async getAll(@Query() queryDto: getContactDto) {
    try {
      const contacts = await this.contactService.getAll(queryDto);
      return {
        status: '200 OK',
        ContentType: 'application/json',
        ResponseBody: contacts,
      };
    } catch (e) {
      console.error(e);
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: ObjectId) {
    const contact = await this.contactService.getOne(id);
    return contact;
  }

  @Delete(':id')
  async delete(@Param('id') id: ObjectId) {
    const contact = await this.contactService.delete(id);
    return contact;
  }

  @Patch(':id')
  async update(@Param('id') id: ObjectId, @Body() bodyDto: UpdateContactDto) {
    const contact = await this.contactService.update(id, bodyDto);
    return contact;
  }
}
