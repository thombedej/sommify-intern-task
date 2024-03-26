export default {
  cardAnimationSlideRight: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%', position: 'absolute' },
    transition: {
      opacity: { duration: 0.15 },
      type: 'spring',
      stiffness: 70,
    },
  },
  cardAnimationSlideUp: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: {
      opacity: 0,
      y: 20,
    },
    transition: {
      duration: 0.18,
      type: 'tween',
      ease: 'easeInOut',
    },
  },
};
