import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export interface ContactRecord {
  id: string;
  name: string;
  email: string;
  message: string;
  source: string;
  company?: string;
  createdAt: string;
  ip: string;
  userAgent: string;
  origin: string;
  referer: string;
}

interface ContactStoreShape {
  contacts: ContactRecord[];
}

const INITIAL_DATA: ContactStoreShape = { contacts: [] };

export class ContactStore {
  private readonly filePath: string;
  private writeQueue: Promise<void> = Promise.resolve();

  constructor(dataDir: string) {
    this.filePath = path.join(dataDir, 'messages.json');
  }

  private async ensureFile() {
    await mkdir(path.dirname(this.filePath), { recursive: true });

    try {
      await readFile(this.filePath, 'utf8');
    } catch {
      await writeFile(this.filePath, JSON.stringify(INITIAL_DATA, null, 2), 'utf8');
    }
  }

  private async writeContact(contact: ContactRecord): Promise<void> {
    await this.ensureFile();
    const raw = await readFile(this.filePath, 'utf8');
    let parsed: ContactStoreShape;

    try {
      parsed = JSON.parse(raw) as ContactStoreShape;
      if (!Array.isArray(parsed.contacts)) {
        parsed = INITIAL_DATA;
      }
    } catch {
      parsed = INITIAL_DATA;
    }

    const next: ContactStoreShape = {
      contacts: [...parsed.contacts, contact].slice(-2000),
    };

    await writeFile(this.filePath, JSON.stringify(next, null, 2), 'utf8');
  }

  async add(contact: ContactRecord): Promise<void> {
    this.writeQueue = this.writeQueue.then(() => this.writeContact(contact));
    await this.writeQueue;
  }
}
