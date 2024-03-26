import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CgArrowRight, CgArrowsV } from 'react-icons/cg';
import { useDimensions } from '../hooks';

export default function SmallButton({
  onClick,
  disabled,
  children,
  style,
  iconVert,
  primary,
  transparent,
  noIcon,
}) {
  const [hovered, setHovered] = useState(false);

  const { isMobile } = useDimensions();

  const background = transparent
    ? '#00000000'
    : primary
    ? '#d1117410'
    : '#000000f0';

  const backgroundHover = transparent
    ? '#00000000'
    : primary
    ? '#d1117415'
    : '#000000f0';

  const color = transparent ? '#a0a5aa' : primary ? '#d11174' : '#ffffff';

  return (
    <motion.button
      style={{
        border: 'none',
        //   background: 'none',
        outline: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: isMobile ? 16 : 15,
        margin: isMobile ? '20px auto 0 auto' : '0 10px 0 0',
        borderRadius: 8,
        color,
        padding: '8px 12px',
        // letterSpacing: 0.5,
        boxShadow:
          primary || transparent ? 'none' : '3px 3px 6px -2px #2a2a2a40',
        ...style,
      }}
      animate={{
        opacity: disabled ? 0.3 : 1,
        background: background,
      }}
      whileHover={{
        background: backgroundHover,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      {iconVert && !noIcon && (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <CgArrowsV style={{ marginRight: 6, fontSize: '1.3em' }} />
        </span>
      )}
      <span style={{ display: 'flex', alignItems: 'center' }}>{children}</span>
      {!iconVert && !noIcon && (
        <motion.span
          initial={false}
          animate={{
            x: hovered ? 3 : 0,
          }}
          transition={{
            duration: 0.1,
            ease: 'linear',
            type: 'tween',
          }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <CgArrowRight style={{ marginLeft: 6, fontSize: '1.3em' }} />
        </motion.span>
      )}
    </motion.button>
  );
}
