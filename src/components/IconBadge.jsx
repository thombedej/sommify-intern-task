import { HiMiniSparkles } from 'react-icons/hi2';
import { TiStarburst, TiStarburstOutline } from 'react-icons/ti';
import { motion } from 'framer-motion';
import { GoNorthStar } from 'react-icons/go';
import { GiRoundStar } from 'react-icons/gi';

export default function IconBadge({ children, icon, style, inline, ...props }) {
  return (
    <motion.span
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      style={{
        fontWeight: 600,
        color: '#00bd78',
        fontSize: 14,
        display: inline ? 'inline-flex' : 'flex',
        alignItems: 'center',
        ...style,
      }}
      {...props}
    >
      {/* <HiMiniSparkles
        style={{
          marginRight: 4,
            fontSize: '0.9em',
          // flip
          transform: 'scaleX(-1)',
        }}
      />{' '} */}
      <GiRoundStar style={{ marginRight: 4 }} />
      generated
    </motion.span>
  );
}
