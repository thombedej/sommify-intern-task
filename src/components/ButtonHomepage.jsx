import { motion } from 'framer-motion';

export default function ButtonHomepage({
  children,
  primary,
  transparent,
  style,
  ...props
}) {
  const colors = {
    transparentIdle: 'rgba(0,0,0, 0)',
    transparentHover: 'rgba(0,0,0, 0.05)',
    defaultIdle: 'rgba(256, 256, 256, 0.28)',
    defaultHover: 'rgba(256, 256, 256, 0.38)',
    primaryIdle: '#000000d0',
    primaryHover: '#000000ff',
  };

  const backgroundIdle = transparent
    ? colors.transparentIdle
    : primary
    ? colors.primaryIdle
    : colors.defaultIdle;
  const backgroundHover = transparent
    ? colors.transparentHover
    : primary
    ? colors.primaryHover
    : colors.defaultHover;

  const color = primary ? '#ffffff' : '#1C1D1E';
  const colorHover = primary ? '#ffffff' : '#1C1D1E';
  const borderRadius = 999;

  return (
    <motion.button
      animate={{
        background: backgroundIdle,
        color: color,
      }}
      whileHover={{
        background: backgroundHover,
        color: colorHover,
      }}
      initial={false}
      style={{
        padding: '8px 14px',
        border: 'none',
        outline: 'none',
        borderRadius,
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'inherit',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
