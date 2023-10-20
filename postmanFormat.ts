  interface KeyValue {
    key: string;
    value: string;
    enabled: boolean;
  }
  
  export interface postmanFormat {
    id: string;
    name: string;
    values: KeyValue[];
  }