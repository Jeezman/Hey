export interface HopHint {
  cltv_expiry_delta?: number;
  node_id?: string;
  chan_id?: string;
  fee_proportional_millionths?: number;
  fee_base_msat?: number;
}

export interface RouteHint {
  hop_hints?: HopHint[];
}

export interface Invoice {
  memo?: string;
  r_preimage?: string;
  r_hash?: string;
  value?: string;
  value_msat?: string;
  settled?: boolean;
  creation_date?: number;
  settle_date?: number;
  payment_request?: string;
  description_hash?: string;
  expiry?: string;
  fallback_addr?: string;
  cltv_expiry?: string;
  route_hints?: RouteHint[];
  private?: boolean;
  add_index?: string;
  settle_index?: string;
  amt_paid?: string;
  amt_paid_sat?: string;
  amt_paid_msat?: string;
  state?: string;
  htlcs?: InvoiceHTLC[];
  features?: any;
  is_keysend?: boolean;
}
