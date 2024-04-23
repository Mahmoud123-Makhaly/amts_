import React from 'react';
interface ITopMessageProps {
  text: string | Array<string>;
  header?: string;
  className?: string;
  color?: 'success' | 'warning' | 'danger' | 'info';
  listStyle?: 'disc' | 'circle' | 'square' | 'decimal' | 'initial' | 'unset';
}
const TopMessage = (props: ITopMessageProps) => {
  const { text, className, color = 'danger', listStyle = 'disc', header } = props;
  return (
    <div className={`py-3 px-5 w-100 border border-${color} rounded ${className}`}>
      {typeof text === 'string' ? (
        <React.Fragment>
          {header && <h4 className={`text-${color}`}>{header}</h4>}
          <p className={`text-${color}`}>{text}</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {header && <h4 className={`text-${color}`}>{header}</h4>}
          <ul className={`list-${listStyle}`}>
            {text.map((msg, index) => (
              <li className={`text-${color} py-2`} key={index}>
                {msg}
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

export default TopMessage;
