/**
 * The create-only CRM intake returns:
 *   201 {id}                  a newly inserted record
 *   200 {id, repeated: true}  the same request was saved earlier
 *   error statuses             unsaved, invalid or conflicting requests
 *
 * Only "created" is a new CRM conversion. The website must not emit
 * another GA4 lead event when a browser retries a saved request.
 *
 * This contract is intentionally strict about unexpected payloads; it does
 * not infer success from a HTTP 2xx status without the expected reference.
 */
export type WebsiteLeadAcknowledgement = 'created' | 'repeated' | 'invalid';

export function classifyWebsiteLeadAcknowledgement(
  responseOk: boolean,
  response: unknown,
  expectedId: string
): WebsiteLeadAcknowledgement {
  if (!responseOk || !expectedId.startsWith('website-') || !response || typeof response !== 'object') {
    return 'invalid';
  }
  const payload = response as { id?: unknown; repeated?: unknown };
  if (payload.id !== expectedId || (payload.repeated !== undefined && typeof payload.repeated !== 'boolean')) {
    return 'invalid';
  }
  return payload.repeated === true ? 'repeated' : 'created';
}
