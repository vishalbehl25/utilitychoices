import type { Metadata } from 'next';
import { PAGE_METADATA } from '@/constants/metadata';

export const metadata: Metadata = PAGE_METADATA.nbn;

export { default } from './NBNClient';
