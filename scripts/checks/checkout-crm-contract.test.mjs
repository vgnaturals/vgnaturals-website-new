import test from 'node:test';
import assert from 'node:assert/strict';
import {
  crmRequestIdFromOrderId,
  newOrderId,
  validateDelivery,
  emptyDelivery
} from '../../lib/checkout.ts';

// These checks mirror the public create-only CRM intake's requestId/email contract.
// No network access, database writes, or customer data are used.
const crmReferencePattern = /^[a-f0-9-]{36}$/;

test('generated customer Order IDs map to stable CRM-compatible references', () => {
  const orderId = newOrderId();
  assert.match(orderId, /^VGN-\d{8}-[A-F0-9]{24}$/);
  const requestId = crmRequestIdFromOrderId(orderId);
  assert.match(requestId, crmReferencePattern);
  assert.equal(crmRequestIdFromOrderId(orderId), requestId);
  assert.equal(requestId.length, 36);
});

test('a second order has a different CRM reference', () => {
  const first = crmRequestIdFromOrderId('VGN-20261103-000000000000000000000001');
  const second = crmRequestIdFromOrderId('VGN-20261103-000000000000000000000002');
  assert.notEqual(first, second);
});

test('reject malformed customer Order IDs instead of posting invalid references', () => {
  for (const value of ['', 'order123', 'VGN-20261103-ABC', 'VGN-20261103-AAAAAAAAAAAAAAAAAAAAAAAAA']) {
    assert.throws(() => crmRequestIdFromOrderId(value), /Invalid order reference/);
  }
});

test('online checkout requires a valid email, matching the CRM intake', () => {
  const delivery = { ...emptyDelivery, name:'Checkout test',phone:'9876543210',address:'Test street',city:'Lucknow',state:'Uttar Pradesh',pin:'226025' };
  assert.equal(validateDelivery(delivery).email !== undefined,true);
  assert.equal(validateDelivery({...delivery,email:'bad-address'}).email !== undefined,true);
  assert.deepEqual(validateDelivery({...delivery,email:'buyer@example.com'}),{});
});
