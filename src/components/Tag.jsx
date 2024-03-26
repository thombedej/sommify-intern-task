export default function Tag({ children, style, dark, ...props }) {
  return (
    <div
      style={{
        fontSize: 12,
        padding: '4px 12px',
        marginBottom: 7,
        borderRadius: 99,
        background: dark ? 'none' : 'linear-gradient(180deg, #fff, #f0f2f3)',
        border: dark ? '1px solid #000' : '1px solid #f0f2f3',
        color: dark ? '#000' : '#80858a',
        fontWeight: 600,
        display: 'inline-block',
        marginRight: 5,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
