interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({ title, description, children, className = '' }: CardProps) {
  return (
    <div className={`rounded-lg border bg-white p-6 shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
