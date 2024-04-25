export interface ApiPaths {
  temporaryStorage?: string;
  persistentStorage?: string;
  configFilePath?: string;
}

export interface ApiProcessData {
  status: ApiProcessInformation;
  config: ApiProcessConfiguration;
}

export enum ApiProcessState {
  CREATED = 0,
  STARTING = 100,
  RUNNING = 200,
  STOPPING = 250,
  FINISHED = 300,
  ERRORED = 400,
  EXHAUSTED = 450,
  MIXED = 500, // Used for clusters with instances of varying modes
}

export interface ApiProcessInformation {
  id: string;
  status: ApiProcessState;
  code?: number;
  signal?: string;
  pid?: number;
  started?: Date;
  exited?: Date;
  blocked?: boolean;
  restarts?: number;
  updated: Date;
  pendingRestartReason?: string;
  type: "cluster" | "process" | "worker";
}

export interface ApiClusterConfiguration {
  instances?: number;
  commonPort?: number;
  startPort?: number;
  strategy?: string;
}

export interface ApiProcessConfiguration {
  id: string;
  cmd?: string;
  worker?: string[];
  env?: Record<string, string>;
  cwd?: string;
  cluster?: ApiClusterConfiguration;
  pidFile?: string;
  watch?: string[];
  autostart?: boolean;
  cron?: string;
  timeout?: number;
  overrun?: boolean;
  logger?: unknown;
  restart?: string;
  restartDelayMs?: number;
  restartLimit?: number;
}

export interface ApiApplicationState {
  pid: number;
  version: string;
  status: string;
  updated: string;
  started: string;
  memory: ApiMemoryUsage;
  port: number;
  systemMemory: ApiSystemMemory;
  loadAvg: number[];
  osUptime: number;
  osRelease: string;
  denoVersion: { deno: string; v8: string; typescript: string };
  type: string;
  processes: ApiProcessInformation[];
}

export interface ApiLogItem {
  severity: string;
  category: string;
  text: string;
  processId: string;
  timeStamp: number;
}
export interface ApiMemoryUsage {
  external?: number;
  heapTotal: number;
  heapUsed: number;
  rss: number;
}
/** Based on Deno.SystemMemoryInfo */
export interface ApiSystemMemory {
  /** Total installed memory in bytes. */
  total: number;
  /** Unused memory in bytes. */
  free: number;
  /** Estimation of how much memory, in bytes, is available for starting new
   * applications, without swapping. Unlike the data provided by the cache or
   * free fields, this field takes into account page cache and also that not
   * all reclaimable memory will be reclaimed due to items being in use.
   */
  available: number;
  /** Memory used by kernel buffers. */
  buffers: number;
  /** Memory used by the page cache and slabs. */
  cached: number;
  /** Total swap memory. */
  swapTotal: number;
  /** Unused swap memory. */
  swapFree: number;
}
export interface ApiTelemetryData {
  sender?: string;
  memory: ApiMemoryUsage;
  sent: string;
  cwd: string;
}
