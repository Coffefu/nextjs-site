import cn from 'classnames';
import { useEffect } from 'react';
import { close } from '../../services/AlertingService';

import styles from './Alert.module.css';

export const Alert = (props) => {

  useEffect(() => {
    if (props.timeout > 0){
      const timer = setTimeout(() => {
        close(props.id);
      }, props.timeout * 1_000);

      return () => {
        clearTimeout(timer);
      };
    }
    
  }, [props.id, props.timeout]);

  return (
    <div className={cn(
      styles.default,
      styles[props.status],
    )}>
      {props.message}
      <button onClick={() => close(props.id)}>X</button>
    </div>
  );
};