import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/brand/sommify.svg';
import LogoWhite from '../assets/brand/logo_full_white.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { useDimensions } from '../hooks';
import { CgChevronDown, CgChevronUp } from 'react-icons/cg';
import { BiSolidCube } from 'react-icons/bi';
import { useState } from 'react';
import ButtonHomepage from './ButtonHomepage';
import { FaChevronRight } from 'react-icons/fa6';

export const products = [
  {
    label: 'somm pair',
    path: '/products/pair',
    icon: <span style={{ marginRight: 6 }}>🧀</span>,
    description: 'Pair any recipe with the perfect wine',
  },
  {
    label: 'somm plus',
    path: '/products/plus',
    icon: <span style={{ marginRight: 6 }}>🍇</span>,
    description: 'Liven up your wines with our data',
  },
  {
    label: 'somm ask',
    beta: true,
    path: '/products/ask',
    icon: <span style={{ marginRight: 6 }}>💬</span>,
    description: 'Let the user ask an AI',
  },
];

const HeaderMobile = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        width: 'calc(100%)',
        zIndex: 999,
        background: '#fff',
      }}
      initial={false}
      animate={{
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        boxShadow: open ? '0px 0px 30px 10px rgba(0, 0, 0, 0.25)' : 'none',
        height: 'auto',
      }}
    >
      <motion.div
        animate={{
          // backdropFilter: open ? 'blur(0px)' : 'blur(20px)',
          borderBottom: open
            ? '1px solid rgba(240,240,240,0)'
            : '1px solid rgba(240,240,240,1)',
        }}
        transition={{
          ease: 'easeInOut',
          type: 'tween',
        }}
        style={{
          display: 'flex',
          alignItems: 'end',
          padding: 10,
          paddingBottom: 16,
          // background blur
        }}
      >
        <motion.img
          src={Logo}
          alt='Logo'
          style={{
            height: 26,
            cursor: 'pointer',
            filter: 'brightness(0)',
          }}
          onClick={() => {
            navigate('/');
          }}
          initial={false}
          transition={{
            duration: 0.15,
            ease: 'easeInOut',
            type: 'tween',
          }}
        />

        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'end',
          }}
        >
          <div
            // className='font-mono'
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: 14,
              color: '#a0a5aa',
              fontWeight: 500,
            }}
            onClick={() => setOpen(!open)}
          >
            <BiSolidCube style={{ marginRight: 3 }} />
            products{' '}
            {open ? (
              <CgChevronUp style={{ marginLeft: 4 }} />
            ) : (
              <CgChevronDown style={{ marginLeft: 4 }} />
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            style={{
              paddingBlock: 40,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {products.map(({ label, path, icon }, index) => (
              <NavLink
                key={index}
                to={path}
                style={{
                  marginBottom: 10,
                  fontSize: 16,
                  textDecoration: 'none',
                  color: 'black',
                  fontWeight: 500,
                  // letterSpacing: 2,
                }}
                onClick={() => setOpen(false)}
              >
                {({ isActive }) => (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0.5,
                    }}
                    whileHover={{
                      opacity: isActive ? 1 : 0.75,
                    }}
                  >
                    {label}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const HeaderDesktop = () => {
  const { width } = useDimensions();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        height: 60,
        alignItems: 'end',
        fontSize: 14,
        marginBottom: '6vh',
      }}
    >
      <motion.img
        src={Logo}
        alt='Logo'
        style={{
          height: 24,
          cursor: 'pointer',
        }}
        onClick={() => {
          navigate('/');
        }}
        initial={false}
        animate={{
          filter: 'brightness(0)',
        }}
        whileHover={{
          filter: 'brightness(1)',
        }}
        transition={{
          duration: 0.15,
          ease: 'easeInOut',
          type: 'tween',
        }}
      />

      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          paddingRight: width < 1200 ? 0 : 0,
          marginLeft: 40,
        }}
      >
        {products.map(({ label, path, icon, beta }, index) => (
          <NavLink
            key={index}
            to={path}
            style={{
              marginInline: 14,
              textDecoration: 'none',
              color: 'black',
            }}
          >
            {({ isActive }) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0.35,
                }}
                whileHover={{
                  opacity: isActive ? 1 : 0.75,
                }}
                style={{
                  fontWeight: 600,
                  // display: 'flex',
                  // alignItems: 'center',
                }}
              >
                {icon} {label}{' '}
                {beta && (
                  <span
                    style={{
                      marginLeft: 5,
                      fontSize: '0.75em',
                      color: '#FFA500',
                    }}
                  >
                    beta
                  </span>
                )}
              </motion.div>
            )}
          </NavLink>
        ))}

        {/* <ButtonHomepage transparent style={{ marginLeft: 30 }}>
          visit docs
          <FaChevronRight style={{ marginLeft: 6, fontSize: '0.8em' }} />{' '}
        </ButtonHomepage> */}
        <ButtonHomepage
          style={{ marginLeft: 30 }}
          primary
          onClick={() => {
            window.open('https://sommify.ai', '_blank');
          }}
        >
          Main page{' '}
          <FaChevronRight style={{ marginLeft: 6, fontSize: '0.8em' }} />{' '}
        </ButtonHomepage>
      </div>
    </div>
  );
};

export default function Header() {
  const { width } = useDimensions();

  return width > 768 ? <HeaderDesktop /> : <HeaderMobile />;
}
