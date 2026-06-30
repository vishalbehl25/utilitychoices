import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { EnquiryRecord } from '@/lib/enquiry/types';

function getStorageDir(): string {
  return process.env.ENQUIRY_STORAGE_DIR?.trim() || 'data/enquiries';
}

export async function saveEnquiry(record: EnquiryRecord): Promise<void> {
  const storageDir = path.resolve(process.cwd(), getStorageDir());

  try {
    await mkdir(storageDir, { recursive: true });
    const filePath = path.join(storageDir, `${record.leadId}.json`);
    await writeFile(filePath, JSON.stringify(record, null, 2), 'utf8');
  } catch (error) {
    console.error('[enquiry] Failed to save enquiry record:', {
      leadId: record.leadId,
      error,
    });
    console.info('[enquiry] Record payload:', JSON.stringify(record));
  }
}
