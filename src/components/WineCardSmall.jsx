import animations from '../animations';
import Card from './Card';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Bottle from '../assets/bottle.svg';
import _ from 'lodash';
import Tag from './Tag';

const WineCardSmall = ({
  wine,
  animation = animations.cardAnimationSlideUp,
  key,
  first,
  ...props
}) => {
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    // load image
    const img = new Image();
    img.src = wine?.imgUrl;
    img.onload = () => {
      setLoadingImage(false);
    };
  }, [wine?.imgUrl]);

  return (
    <Card
      key={key}
      id={key + '_wine_card'}
      style={{
        display: 'flex',
        marginBottom: 16,
        paddingInline: 5,
        paddingBottom: 0,
      }}
      {...props}
      {...animation}
      {...(first ? { initial: false } : {})}
    >
      <div
        style={{
          marginRight: 10,
          width: 90,
          maxWidth: 90,
          minWidth: 90,
          height: 110,
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence initial={false}>
          {loadingImage && (
            <motion.img
              src={Bottle}
              initial={{ visibility: 'hidden', opacity: 0 }}
              animate={{
                visibility: 'visible',
                opacity: [0.1, 0.04],
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 1,
                ease: 'easeInOut',
              }}
              exit={{
                visibility: 'hidden',
                opacity: 0,
                position: 'absolute',
              }}
              // className='shimmer'
              key='large-plate-placeholder'
              style={{
                height: 180,
                maxHeight: 180,
                objectFit: 'cover',
                //   keep image ratio
                width: 'auto',
              }}
            />
          )}
          {!loadingImage && (
            <motion.img
              src={wine?.imgUrl}
              alt={wine?.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              key='large-plate-image'
              // if no image, use placeholder
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = Bottle;
              }}
              style={{
                width: 'auto',
                height: 180,
                objectFit: 'cover',
              }}
            />
          )}
        </AnimatePresence>
      </div>
      <div style={{ paddingBottom: 10 }}>
        <h4 style={{ marginBottom: '0.45em' }}>{wine?.title}</h4>
        {[
          wine?.typeL1 && _.capitalize(wine?.typeL1 + ' wine'),
          wine?.typeL2 && _.capitalize(wine?.typeL2 + ' wine'),
          wine?.country,
          wine?.year,
          ...(wine?.grapes || []),
        ]
          .filter(Boolean)
          .map((text, i) => (
            <Tag key={'wine_tag_' + i}>{text}</Tag>
          ))}
      </div>
    </Card>
  );
};

export default WineCardSmall;
