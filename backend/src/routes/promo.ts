import express from 'express';

const router = express.Router();

const promoCodes = {
  SAVE10: { type: 'percentage', value: 10 },
  FLAT100: { type: 'fixed', value: 100 },
  WELCOME20: { type: 'percentage', value: 20 },
  FIRSTTIME: { type: 'percentage', value: 15 }
};

router.post('/validate', async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Promo code is required' });
    }

    const promoCode = promoCodes[code.toUpperCase() as keyof typeof promoCodes];

    if (!promoCode) {
      return res.status(404).json({ error: 'Invalid promo code' });
    }

    let discount = 0;
    if (promoCode.type === 'percentage') {
      discount = (subtotal * promoCode.value) / 100;
    } else if (promoCode.type === 'fixed') {
      discount = Math.min(promoCode.value, subtotal);
    }

    res.json({
      valid: true,
      code: code.toUpperCase(),
      discount: parseFloat(discount.toFixed(2)),
      type: promoCode.type,
      value: promoCode.value
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({ error: 'Failed to validate promo code' });
  }
});

export default router;
