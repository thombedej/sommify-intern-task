import { motion } from 'framer-motion';
import { useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';
import { GoDash, GoPlus } from 'react-icons/go';

export default function Button({
  children,
  showMore,
  withArrow,
  onClick,
  outline,
  style,
}) {
  const [hovered, setHovered] = useState(false);
  const withPlus = showMore !== undefined;

  return (
    <motion.div
      // className='font-mono'
      style={{
        // minHeight: 38,
        fontSize: 15,
        fontWeight: outline ? 400 : 600,
        display: 'inline-flex',
        // paddingInline: 24,
        padding: 6,
        alignItems: 'center',
        justifyContent: 'center',
        border: outline ? '1px solid #323435a0' : 'none',
        color: outline ? '#323435' : '#fff',
        borderRadius: 6,
        cursor: 'pointer',
        marginRight: 10,
        marginBottom: 10,
        ...style,
      }}
      initial={false}
      animate={{
        background: outline ? '#fff' : hovered ? '#0024e0' : '#0029ff',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {withPlus && (
        <motion.span
          initial={false}
          animate={{
            rotate: hovered && !showMore ? 90 : 0,
          }}
          transition={{
            duration: 0.1,
            ease: 'linear',
            type: 'tween',
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {!showMore ? <GoPlus style={{ fontSize: '1.4em' }} /> : <GoDash />}
        </motion.span>
      )}
      <motion.span style={{ marginLeft: withPlus ? 10 : 0 }}>
        {children}
      </motion.span>
      {withArrow && (
        <motion.span
          initial={false}
          animate={{
            x: hovered ? 4 : 0,
          }}
          transition={{
            duration: 0.1,
            ease: 'easeOut',
            type: 'tween',
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CgChevronRight style={{ marginLeft: 10, fontSize: '1.4em' }} />
        </motion.span>
      )}
    </motion.div>
  );
}
