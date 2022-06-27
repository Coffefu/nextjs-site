import cn from "classnames";

import { Alert } from "../components/Alert/Alert";

import styles from "./AlertingService.module.css";

import { onAlert, onClosed } from "./AlertingService";
import { useEffect, useState } from "react";

export const AlertingService = (props) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const onAlertSubscription$ = onAlert().subscribe(v => {
      setAlerts([
        ...alerts,
        v,
      ]);
    });
    const onClosedSubscription$ = onClosed().subscribe(id => {
      setAlerts(
        alerts.filter(alert => alert.id !== id),
      );      
    });
  
    return () => {
      onAlertSubscription$.unsubscribe();
      onClosedSubscription$.unsubscribe();
    };
  }, [alerts]);

  const alertsContent = alerts.map((alert) => {
    return <Alert key={alert.id} {...alert} />;
  });

  return (
    <div
      className={cn(
        styles.default,
        styles[props.horizontal],
        styles[props.vertical]
      )}
    >
      {alertsContent}
    </div>
  );
};
