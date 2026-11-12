"use client";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

/** QR code pointing at an artisan's public profile on this site. */
export function Qr({ artisanId, size = 120 }: { artisanId: string; size?: number }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    QRCode.toDataURL(`${location.origin}/p/?a=${artisanId}`, { margin: 1, width: size * 2 }).then(setSrc);
  }, [artisanId, size]);
  // eslint-disable-next-line @next/next/no-img-element -- data URL, nothing to optimise
  return src ? <img src={src} width={size} height={size} alt={`QR ${artisanId}`} className="rounded-lg" /> : <span style={{ width: size, height: size }} />;
}
