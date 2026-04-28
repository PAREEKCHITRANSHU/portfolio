interface BlockWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function BlockWrapper({ children, className, style }: BlockWrapperProps) {
  return (
    <div
      className={className}
      style={{ marginBottom: "32px", ...style }}
    >
      {children}
    </div>
  );
}
