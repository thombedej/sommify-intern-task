import React from 'react';
import { motion } from 'framer-motion';
import { useDimensions } from '../hooks';

export default function Card({ children, style, ...props }) {
  const { isMobile } = useDimensions();

  return (
    <motion.div
      style={{
        borderRadius: 16,
        border: '1px solid #efefef',
        boxShadow: '3px 3px 6px -2px #2a2a2a40',
        background: 'white',
        paddingInline: isMobile ? 15 : 50,
        paddingBlock: 30,
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
