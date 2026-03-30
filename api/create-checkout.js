import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICES = {
  't-adult':   2999,
  't-student': 1500,
  'h-adult':   2999,
  'h-student': 1500,
};

const NAMES = {
  't-adult':   '東京公演｜大人席',
  't-student': '東京公演｜学生席',
  'h-adult':   '広島公演｜大人席',
  'h-student': '広島公演｜学生席',
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.BASE_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { items, notes } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'items は1件以上必要です' });
  }

  // Validate each item
  for (const item of items) {
    if (!PRICES[item.id]) {
      return res.status(400).json({ error: `不明なチケットID: ${item.id}` });
    }
    const qty = item.quantity;
    if (!Number.isInteger(qty) || qty < 1 || qty > 5) {
      return res.status(400).json({ error: `数量は1〜5の整数で指定してください: ${item.id}` });
    }
  }

  const line_items = items.map((item) => ({
    price_data: {
      currency: 'jpy',
      unit_amount: PRICES[item.id],
      product_data: {
        name: NAMES[item.id],
      },
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    locale: 'ja',
    phone_number_collection: { enabled: true },
    billing_address_collection: 'required',
    customer_creation: 'always',
    line_items,
    success_url: `${process.env.BASE_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/tickets.html`,
    metadata: { notes: (notes || '').substring(0, 500) },
    payment_intent_data: {
      metadata: { notes: (notes || '').substring(0, 500) },
    },
  });

  return res.status(200).json({ url: session.url });
}
