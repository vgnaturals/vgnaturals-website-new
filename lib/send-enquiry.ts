export async function sendEnquiry(data: Record<string, FormDataEntryValue>): Promise<'accepted' | 'activation-required'> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch('https://formsubmit.co/ajax/vgnaturalspvtltd@gmail.com', {
      method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify(data), signal: controller.signal,
    });
    if (!response.ok) throw new Error('Email service unavailable');
    const result: unknown = await response.json();
    if (!result || typeof result !== 'object') throw new Error('Unconfirmed submission');
    const payload = result as {success?: unknown; message?: unknown};
    if (typeof payload.message === 'string' && /activat|confirm your email|verify your email/i.test(payload.message)) return 'activation-required';
    if (payload.success !== true && payload.success !== 'true') throw new Error('Unconfirmed submission');
    return 'accepted';
  } finally { clearTimeout(timeout); }
}
