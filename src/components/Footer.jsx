export default function Footer({}) {
  return (
    <div
      class='hubot-sans footer'
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: 11.5,
        paddingTop: 90,

        // width: 600,
        // maxWidth: 600,
        // margin: 'auto',
      }}
    >
      <span>
        FOLLOW OUR JOURNEY ON{' '}
        <a href='https://www.linkedin.com/company/sommifyai/' target='_blank'>
          LINKEDIN
        </a>
      </span>
      {/* <span>DOCUMENTATION</span> */}
      <span>
        POCKETSOMM OY 2021-2024,{' '}
        <a
          href='https://drive.google.com/file/d/1ANL8N4lXOqdFQbZ8Mc1J4Q2OTL6LnTBI/view?usp=sharing'
          target='_blank'
        >
          PRIVACY POLICY
        </a>
      </span>
    </div>
  );
}
