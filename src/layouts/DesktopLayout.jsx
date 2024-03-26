import { motion } from 'framer-motion';
import Button from '../components/Button';
import { useState } from 'react';
import AnimatedText from '../components/AnimatedText';
import { useDimensions } from '../hooks';
import SmallButton from '../components/SmallButton';
import { CgMathMinus, CgMathPlus } from 'react-icons/cg';

export default function DesktopLayout({
  children,
  productTitle,
  product,
  heading,
  subheading,
  description,
  onTryItOut,
}) {
  const [showMore, setShowMore] = useState(false);
  const contentDelay = 1.1;

  const { isMobile, width } = useDimensions();

  return (
    <motion.div
      key={productTitle}
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.38,
        ease: 'easeOut',
      }}
      style={{
        display: 'flex',
        width: '100%',
        paddingTop: 120,
        flexWrap: 'wrap',
        flexBasis: 800,
      }}
    >
      <div
        style={
          isMobile
            ? {
                width: '100%',
              }
            : { width: 550, paddingRight: 100 }
        }
      >
        <h3 style={{ marginBottom: '0.66em' }}>{productTitle}</h3>
        <AnimatedText once text={heading} el='h1' />
        <AnimatedText
          once
          text={subheading}
          el='h1'
          initialDelay={800}
          style={{
            marginBottom: 50,
            color: '#808589',
          }}
        />
        <br />
        <br />
        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
            delay: contentDelay,
          }}
          style={{ marginBottom: 50 }}
        >
          {description}

          {showMore && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {children}
            </motion.div>
          )}
          <div
            style={{
              display: 'flex',
              marginTop: 50,
              flexBasis: 200,
              flexWrap: 'wrap',
              marginBottom: isMobile ? 150 : 0,
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}
          >
            <SmallButton
              showMore={showMore}
              // outline
              noIcon
              primary
              // style={{ fontSize: 15 }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'show less' : 'find out more'}
              {showMore ? (
                <CgMathMinus style={{ marginLeft: 4 }} />
              ) : (
                <CgMathPlus style={{ marginLeft: 4 }} />
              )}
            </SmallButton>
            <SmallButton
              onClick={() => {
                window.open('https://docs.sommify.ai', '_blank');
              }}
              transparent
            >
              read docs
            </SmallButton>
            {/* {isMobile && (
              <Button
                style={{ width: 150 }}
                onClick={() => {
                  // find top of product section
                  const product = document.getElementById('product');
                  window.scrollTo({
                    top: product.offsetTop - 100,
                    behavior: 'smooth',
                  });
                }}
                withArrow
              >
                try it out
              </Button>
            )} */}
          </div>
        </motion.div>
      </div>

      <motion.div
        id='product'
        initial={{
          opacity: 0,
          y: -50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
          delay: contentDelay,
        }}
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '100%',
          width: isMobile ? '100%' : 'auto',
        }}
      >
        {product}
      </motion.div>
    </motion.div>
  );
}
