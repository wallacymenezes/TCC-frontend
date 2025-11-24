export function HexagonLogo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hexagon pattern inspired by beehive/celtic knot */}
      <path
        d="M50 5L87.3 25V65L50 85L12.7 65V25L50 5Z"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        className="text-hive-purple"
      />
      <path d="M50 20L70 32V56L50 68L30 56V32L50 20Z" fill="currentColor" className="text-hive-yellow" />
      <path d="M50 35L58 40V50L50 55L42 50V40L50 35Z" fill="currentColor" className="text-hive-purple" />
      {/* Interconnecting lines */}
      <path
        d="M30 25L50 35L70 25M30 65L50 55L70 65"
        stroke="currentColor"
        strokeWidth="2"
        className="text-hive-purple"
      />
    </svg>
  )
}

export function HiveIcon({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 8L16 10.5V15.5L12 18L8 15.5V10.5L12 8Z" fill="currentColor" opacity="0.3" />
    </svg>
  )
}
