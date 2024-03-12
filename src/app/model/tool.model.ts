// src/app/models/tool.model.ts
import { User } from './user.model';

export interface Tool {
  id?: number;
  name: string;
  description?: string;
  status: string;
  available: boolean;
  owner?: User;
  createdAt?: string;
}
