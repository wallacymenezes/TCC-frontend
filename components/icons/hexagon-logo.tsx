import Image from "next/image"

export function HexagonLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/logo-branca.png"
        alt="Logo HiveBooks"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}

export function HiveIcon({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/logo-branca.png"
        alt="Logo HiveBooks"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}