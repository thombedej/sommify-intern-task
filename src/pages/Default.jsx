import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useDimensions } from '../hooks';
import Footer from '../components/Footer';

export function Default() {
  const { isMobile } = useDimensions();

  return (
    <div
      style={{
        // this is not working when deployed
        backgroundImage: `url(/background.svg)`,

        position: 'relative',
        minHeight: '100vh',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(90deg, rgba(256,256,256,1) 0%, rgba(256,256,256,0) 100%)',
        }}
      >
        <div
          style={{
            margin: 'auto',
            maxWidth: isMobile ? '90vw' : '95vw',
            width: isMobile ? 'auto' : 1400,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: isMobile ? '4vh' : 0,
            paddingBottom: '9vh',
            // paddingInline: '5vw',
          }}
        >
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}
