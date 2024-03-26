import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Attributes from './Attributes';
import Bottle from '../assets/bottle.svg';
import _ from 'lodash';
import { PiCookingPotFill } from 'react-icons/pi';
import Tag from './Tag';
import { useDimensions } from '../hooks';
import Card from './Card';
import IconBadge from './IconBadge';

export function decodeHtml(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function camelCaseToSeparateWords(str) {
  if (str === 'longetivityInvestmentInfo') return 'longevity & investment info';
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
}

const LOAD_PADDING = 1250;

const WineImage = ({ src, alt, loading }) => {
  const { width } = useDimensions();
  const isSmall = width < 630;

  return (
    <div
      style={{
        marginRight: isSmall ? 0 : 50,
        marginTop: isSmall ? 0 : 45,
        paddingBlock: isSmall ? 20 : 0,
        width: 120,
        maxHeight: 300,
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: isSmall ? 'center' : 'flex-start',
      }}
    >
      <AnimatePresence initial={false}>
        {loading && (
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
            style={{ height: 300, objectFit: 'cover' }}
          />
        )}
        {!loading && (
          <motion.img
            src={src}
            alt={alt}
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
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const WineTitle = ({ wine }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      {[
        wine?.typeL1 && _.capitalize(wine?.typeL1 + ' wine'),
        wine?.typeL2 && _.capitalize(wine?.typeL2 + ' wine'),
        wine?.year,
        ...wine?.grapes,
      ]
        .filter(Boolean)
        .map((text, i) => (
          <Tag key={'wine_tag_' + i}>{text}</Tag>
        ))}
      <h4 style={{ fontWeight: 700, marginTop: 10 }}>
        {decodeHtml(wine?.title)}
      </h4>
      <br />
      <div style={{ display: 'flex' }}>
        <span
          style={{
            // fontWeight: 600,
            marginRight: 10,
            marginLeft: 2,
            fontSize: 14,
          }}
        >
          Our Data
        </span>{' '}
        <IconBadge />
      </div>
    </div>
  );
};

export default function WineCard({ wine, info = {}, textInfo, first }) {
  const [loadingImage, setLoadingImage] = useState(true);

  function loadImage() {
    const startTime = Date.now();
    const image = new Image();
    image.src = wine?.imgUrl;

    image.onload = function () {
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime < LOAD_PADDING) {
        // If the image loaded faster than 1 second, wait out the remaining time
        const remainingTime = LOAD_PADDING - elapsedTime;
        setTimeout(function () {
          setLoadingImage(false);
        }, remainingTime);
      } else {
        // If the image took longer than 1 second to load, perform the action immediately
        setLoadingImage(false);
      }
    };
  }

  useEffect(() => {
    // load image
    loadImage();
  }, [wine?.imgUrl]);

  const { width } = useDimensions();
  const isSmall = width < 630;

  return (
    <Card
      key={wine?.id}
      initial={first ? false : { opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%', position: 'absolute' }}
      transition={{
        opacity: { duration: 0.15 },

        type: 'spring',
        stiffness: 70,
      }}
      style={{
        minWidth: isSmall ? 260 : 550,
        maxWidth: '100%',
        minHeight: 480,
        paddingInline: isSmall ? 20 : 50,
        display: 'flex',
        flexDirection: isSmall ? 'column' : 'row',
      }}
    >
      {isSmall && <WineTitle wine={wine} />}
      {!isSmall && (
        <WineImage
          loading={loadingImage}
          src={wine?.imgUrl}
          alt={wine?.title}
        />
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        {!isSmall && <WineTitle wine={wine} />}
        <Attributes
          style={{
            padding: 16,
            borderRadius: 10,
          }}
          background={
            // isSmall ?
            '#f0fff6'
            // : '#fafbfc'
          }
        >
          {[
            {
              label: 'food tags',
              content: info?.categories?.map((category, i) => (
                <Tag key={'food_tag_' + i} dark style={{ marginBottom: 3 }}>
                  {category}
                </Tag>
              )),

              defaultOpen: true,
            },
            {
              label: 'recipes',
              content: (
                <ul style={{ margin: 0, paddingInline: 0 }}>
                  {info?.titles?.map((title, i) => (
                    <li
                      key={'recipe_title_' + i}
                      style={{
                        // max 1 row
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: 330,
                      }}
                    >
                      <PiCookingPotFill /> {decodeHtml(title)}
                    </li>
                  ))}
                </ul>
              ),
            },
            ..._.map(textInfo, (value, key) => ({
              label: camelCaseToSeparateWords(key),
              content: value,
            })),

            {
              label: 'regionality',
              comingSoon: true,
            },
            {
              label: 'grape varietals',
              comingSoon: true,
            },
          ]}
        </Attributes>
      </div>
    </Card>
  );
}
