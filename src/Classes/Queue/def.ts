export interface IAdvertiserRequest {
  type: "HEART_BEAT" | "FETCH";
  host_id: number;
  address?: string;
}
