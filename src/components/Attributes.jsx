import Attribute from './Attribute';

export default function Attributes({ children, style, background = '#fff' }) {
  return (
    <div
      className='font-mono'
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background,
        ...style,
      }}
    >
      {children.map((attribute, index) => (
        <Attribute background={background} key={index} {...attribute} />
      ))}
    </div>
  );
}
