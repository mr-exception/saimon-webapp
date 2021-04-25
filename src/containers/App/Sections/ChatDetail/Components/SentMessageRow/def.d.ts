interface ISentMessageRowProps {
  text: string;
  sent_at: number;
  status: "SENT" | "DELIVERED" | "FAILED";
}
