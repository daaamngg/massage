type IconProps = { size?: number; className?: string };

export function VkIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M13.16 18.06c-6.02 0-9.9-4.13-10.06-10.99h3.03c.11 5.04 2.42 7.2 4.18 7.63V7.07h2.9v4.28c1.7-.19 3.48-2.18 4.08-4.28h2.85a8.14 8.14 0 0 1-3.72 5.31 8.43 8.43 0 0 1 4.35 5.68h-3.14c-.66-2.08-2.28-3.69-4.42-3.92v3.92h-.05Z" />
    </svg>
  );
}

export function TelegramIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M21.94 4.31 19 19.17c-.22 1-.82 1.24-1.66.77l-4.58-3.37-2.2 2.13c-.25.24-.45.45-.92.45l.33-4.66 8.48-7.66c.37-.33-.08-.51-.57-.19L7.42 13.24l-4.5-1.41c-.98-.3-1-.98.2-1.45l17.6-6.78c.82-.3 1.53.2 1.22 1.4Z" />
    </svg>
  );
}

export function MaxIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 21c4.97 0 9-3.8 9-8.5S16.97 4 12 4s-9 3.8-9 8.5c0 2.2.89 4.2 2.34 5.7L4.5 21l3.3-1.2c1.28.51 2.7.78 4.2.78Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.4 15V10l3.1 3.2L14.6 10v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
