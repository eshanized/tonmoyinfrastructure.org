import { z } from 'zod';

export const VALID_CONTACT_CATEGORIES = [
  'general',
  'sales',
  'hosting',
  'domains',
  'technical',
  'security',
  'research',
  'partnership',
  'partnerships',
  'press',
  'careers',
  'investors',
] as const;

export type ContactCategoryValue = (typeof VALID_CONTACT_CATEGORIES)[number];

export const ContactSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or fewer'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(254, 'Email must be 254 characters or fewer'),
  category: z.enum(VALID_CONTACT_CATEGORIES, {
    errorMap: () => ({ message: 'Please select a valid contact category' }),
  }),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be under 5000 characters'),
  // Bot defenses
  hp: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
  submittedAt: z.number().optional(),
});

export type ContactSubmissionInput = z.infer<typeof ContactSubmissionSchema>;

export interface ContactDeliveryResult {
  success: boolean;
  status: number;
  message?: string;
  error?: string;
  code?: 'INVALID_INPUT' | 'RATE_LIMITED' | 'UNCONFIGURED' | 'PROVIDER_ERROR' | 'SPAM_REJECTED';
}
