import { Observable, Subject } from "rxjs";

const alertsSubject = new Subject();

const alert = (status, message, timeout) => {
  alertsSubject.next({
    id: Math.round(window.performance.now() * 10),
    status,
    message,
    timeout,
  });
};

const success = (message, timeout = 0) => {
  alert("success", message, timeout);
};

const error = (message, timeout = 0) => {
  alert("error", message, timeout);
};

const warning = (message, timeout = 0) => {
  alert("warning", message, timeout);
};

const info = (message, timeout = 0) => {
  alert("info", message, timeout);
};

const onAlert = () => {
  return alertsSubject.asObservable();
};

const closedAlertsSubject = new Subject();

const close = (id) => {
  closedAlertsSubject.next(id);
};

const onClosed = () => {
  return closedAlertsSubject.asObservable();
};

export { success, warning, error, info, onAlert, close, onClosed };
