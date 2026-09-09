export const WHATSAPP_PHONE_NUMBER = "916304270702";

export interface ShareableProduct {
  id: number;
  name: string;
  price: string;
  category?: string;
}

/**
 * Format a rich, readable product share message for WhatsApp
 */
export function buildProductShareMessage(
  product: ShareableProduct,
  selectedFinish?: string
): string {
  const productUrl = `${window.location.origin}/products/${product.id}`;
  let msg = `✨ Check out this handcrafted *${product.name}* from *HiTech Wood Handicrafts*!\n\n`;
  if (product.category) {
    msg += `🏷️ *Category:* ${product.category}\n`;
  }
  msg += `💰 *Price:* ${product.price} (Direct Factory Pricing)\n`;
  if (selectedFinish) {
    msg += `🎨 *Selected Finish:* ${selectedFinish}\n`;
  }
  msg += `\n🔗 *View Photos & Custom Specs:* ${productUrl}`;
  return msg;
}

/**
 * Share via native Web Share API (mobile) or open WhatsApp directly
 */
export async function shareProduct(
  product: ShareableProduct,
  selectedFinish?: string
): Promise<boolean> {
  const shareText = buildProductShareMessage(product, selectedFinish);
  const productUrl = `${window.location.origin}/products/${product.id}`;

  // If native share is supported and available on mobile device
  if (navigator.share && typeof navigator.share === "function") {
    try {
      await navigator.share({
        title: `${product.name} | HiTech Wood Handicrafts`,
        text: shareText,
        url: productUrl,
      });
      return true;
    } catch (err: any) {
      // If user cancelled, don't fallback to opening link
      if (err?.name === "AbortError") {
        return false;
      }
    }
  }

  // Fallback to WhatsApp URL
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  return true;
}

/**
 * Open direct WhatsApp conversation with HiTech Wood Handicrafts workshop
 */
export function openWhatsAppChat(message: string): void {
  const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
