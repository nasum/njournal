// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {main} from '../models';
import {uuid} from '../models';

export function CreateNote(arg1:string):Promise<main.Note>;

export function GetNote(arg1:uuid.UUID):Promise<main.Note>;

export function ListNotes():Promise<Array<main.Note>>;

export function UpdateNote(arg1:uuid.UUID,arg2:string):Promise<main.Note>;
