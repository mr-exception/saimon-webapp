import React from "react";
import { useSelector } from "react-redux";
import { selectContacts, selectReportQueue } from "Redux/types/selectors";
import Button from "UI-Kit/Button/Button";
const Setting = () => {
  const contacts = useSelector(selectContacts);
  const report_queue = useSelector(selectReportQueue);
  const sendReport = () => {
    contacts.forEach((contact) => {
      console.log(`sending a report to ${contact.id}`);
      report_queue.push({ contact, once: true });
    });
  };
  return (
    <div>
      <Button caption="send report" onClick={sendReport} variant="secondary" />
    </div>
  );
};

export default Setting;
