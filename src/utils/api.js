// POS integration placeholder using Fetch. Set VITE_POS_BASE_URL in .env for production
export async function submitOrderToPOS(orderData) {
  const base = import.meta.env.VITE_POS_BASE_URL;
  if (!base) {
    await new Promise(r => setTimeout(r, 800));
    return { ok: true, orderId: orderData.orderId, status: 'pending' };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout

  try {
    const res = await fetch(`${base}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
      signal: controller.signal
    });
    if (!res.ok) throw new Error('POS submission failed');
    return await res.json();
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('Request timed out');
    throw e;
  } finally {
    clearTimeout(timeout);
  }
}