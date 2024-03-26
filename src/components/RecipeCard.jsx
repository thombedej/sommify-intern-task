import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Food from '../assets/icons/food.png';
import Attributes from './Attributes';
import { useDimensions } from '../hooks';
import Card from './Card';
import animations from '../animations';

function decodeHtml(html) {
  var txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

const opacityAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
  exit: { opacity: 0, position: 'absolute' },
};

//   pulsate animation
const loadingAnimation = {
  initial: { opacity: 0.1 },
  animate: { opacity: 0.2 },
  transition: {
    repeat: Infinity,
    repeatType: 'reverse',
    duration: 1,
    ease: 'easeInOut',
  },
  exit: { opacity: 0, position: 'absolute', visibility: 'hidden' },
};

const RecipeTitle = ({ title }) => {
  const { width } = useDimensions();
  const isSmall = width < 630;

  return (
    <AnimatePresence>
      {title && (
        <motion.h4
          key='loaded-title'
          {...opacityAnimation}
          style={{
            // single line
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: isSmall ? 'normal' : 'nowrap',
            maxWidth: 400,
            width: '100%',
          }}
        >
          {decodeHtml(title)}
        </motion.h4>
      )}
      {(title === undefined || title === null) && (
        <motion.h4
          key='loading-title'
          {...loadingAnimation}
          style={{
            width: 320,
            background: 'black',
            borderRadius: 8,
          }}
        >
          &nbsp;
        </motion.h4>
      )}
    </AnimatePresence>
  );
};

const RecipeImage = ({ loading, src }) => {
  const { width } = useDimensions();
  const isSmall = width < 630;

  return (
    <div
      style={{
        paddingRight: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isSmall ? 'start' : 'center',
      }}
    >
      <AnimatePresence>
        {!loading && (
          <motion.img {...opacityAnimation} src={Food} style={{ width: 120 }} />
        )}

        {loading && (
          <motion.img
            {...loadingAnimation}
            src={Food}
            style={{ width: 120, filter: 'brightness(0)', borderRadius: 8 }}
          />
        )}
      </AnimatePresence>
      <span
        className='font-mono'
        style={{
          fontSize: 12,
          opacity: 0.6,
          width: 120,
          textAlign: 'center',
          height: 18,
          // no text selection
          userSelect: 'none',
        }}
      >
        {!loading ? 'TEMP IMAGE' : ''}
      </span>
    </div>
  );
};

export default function RecipeCard({
  recipe,
  wine,
  first,
  contentComingSoon,
  animation = animations.cardAnimationSlideRight,
}) {
  const [loadingImage, setLoadingImage] = useState(true);
  const { width } = useDimensions();

  const isSmall = width < 630;

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
      key={wine?.id}
      {...animation}
      {...(first ? { initial: false } : {})}
      style={{
        display: 'flex',
        flexDirection: isSmall ? 'column' : 'row',
        maxWidth: '100%',
        // width: '90%',
        marginBottom: 16,
      }}
    >
      {isSmall && <RecipeTitle title={recipe?.title} />}
      {isSmall && <br />}
      {/* {!isSmall && (
        <RecipeImage loading={recipe.title === undefined} src={wine?.imgUrl} />
      )} */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {!isSmall && <RecipeTitle title={recipe?.title} />}
        <br />
        <Attributes>
          {[
            {
              label: 'ingredients',
              content: recipe?.ingredients?.join(', '),
              defaultOpen: false,
              preview: true,
              comingSoon: contentComingSoon,
            },
            {
              label: 'steps',
              content: (
                <ul
                  style={{
                    padding: 0,
                    paddingLeft: 20,
                    margin: 0,
                  }}
                >
                  {recipe?.steps?.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              ),
              comingSoon: contentComingSoon,
            },
          ]}
        </Attributes>
      </div>
    </Card>
  );
}
