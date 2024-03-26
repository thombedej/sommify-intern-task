import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CgChevronRight, CgChevronDown } from 'react-icons/cg';
import { useDimensions } from '../hooks';

export default function Attribute({
  label,
  content,
  defaultOpen,
  comingSoon,
  disabled,
  preview,
  background,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [opened, setOpened] = useState(defaultOpen);

  disabled = disabled || comingSoon;
  const { isMobile } = useDimensions();

  return (
    <div
      style={{
        // opacity: disabled ? 0.5 : 1,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 12,
        color: disabled ? '#a0a5aa' : '#000',
        width: '100%',
      }}
      {...props}
    >
      <div
        style={{
          display: 'flex',
          height: 16,
          paddingBottom: 12,
          fontSize: 14,
          fontWeight: 400,
          alignContent: 'center',
          // max 1 line,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 1,
          position: 'relative',
          cursor: disabled ? 'default' : 'pointer',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onClick={(e) => {
          e.preventDefault();
          !disabled && setOpened(!opened);
        }}
      >
        <div
          style={{
            height: '100%',
            position: 'absolute',
            right: 0,
            top: 0,
            width: '6em',
            background: `linear-gradient(to right, transparent 0%,${background} 100%)`,
            zIndex: 10,
          }}
        />
        {label}{' '}
        {comingSoon && (
          <span style={{ marginLeft: 8, color: 'purple' }}>coming soon</span>
        )}
        {!disabled && (
          <motion.span
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0.3,
            }}
            transition={{
              duration: 0.025,
              ease: 'linear',
              type: 'tween',
              lineHeight: 1,
            }}
          >
            {opened ? (
              <CgChevronDown style={{ marginLeft: 8 }} />
            ) : (
              <CgChevronRight style={{ marginLeft: 8 }} />
            )}
          </motion.span>
        )}
        {preview && !opened && (
          <span
            style={{
              color: '#c0c5ca',
              flex: 1,
              marginLeft: 8,
              lineHeight: 1,
              whiteSpace: 'nowrap',
              position: 'relative',
              minWidth: 0,
            }}
          >
            {content}
          </span>
        )}
      </div>
      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            paddingBottom: 14,
            fontSize: '0.9em',
            maxWidth: isMobile ? '100%' : 333,
          }}
        >
          {content || 'loading...'}
        </motion.div>
      )}
      <div
        style={{
          width: '100%',
          height: '1px',
          background: disabled ? '#a0a5aa' : '#000',
        }}
      ></div>
    </div>
  );
}
