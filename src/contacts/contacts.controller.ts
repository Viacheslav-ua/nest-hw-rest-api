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
import { createContactDto } from './dto/create-contact.dto';

interface ResQuery {
  sortBy: string;
  sortByDesc: string;
  filter: string;
  page: string;
  favorite: string;
}

@Controller('/api/contacts')
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @Post()
  async create(@Body() dto: createContactDto) {
    return await this.contactService.create(dto);
  }

  @Get()
  async getAll(@Query() query: ResQuery) {
    try {
      const contacts = await this.contactService.getAll();
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
  async update(@Param('id') id: ObjectId, @Body() dto: createContactDto) {
    const contact = await this.contactService.update(id, dto);
    return contact;
  }
}
