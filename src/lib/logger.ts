/**
 * Logging utility for the Artifact Research Survey app
 * Provides structured logging for debugging and analytics
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    category: string;
    message: string;
    data?: Record<string, unknown>;
}

// Color codes for console output
const LOG_COLORS = {
    debug: '#888888',
    info: '#4FFFE0',   // Artifact mint
    warn: '#FFB74F',   // Orange
    error: '#FF4F8E',  // Artifact coral
} as const;

// In-memory log buffer for debugging
const logBuffer: LogEntry[] = [];
const MAX_BUFFER_SIZE = 100;

function createLogEntry(
    level: LogLevel,
    category: string,
    message: string,
    data?: Record<string, unknown>
): LogEntry {
    return {
        timestamp: new Date().toISOString(),
        level,
        category,
        message,
        data,
    };
}

function logToConsole(entry: LogEntry) {
    const color = LOG_COLORS[entry.level];
    const prefix = `%c[${entry.category}]`;
    const style = `color: ${color}; font-weight: bold`;

    if (entry.data) {
        console.groupCollapsed(prefix, style, entry.message);
        console.log('Timestamp:', entry.timestamp);
        console.log('Data:', entry.data);
        console.groupEnd();
    } else {
        console.log(prefix, style, entry.message);
    }
}

function addToBuffer(entry: LogEntry) {
    logBuffer.push(entry);
    if (logBuffer.length > MAX_BUFFER_SIZE) {
        logBuffer.shift();
    }
}

/**
 * Create a logger instance for a specific category
 */
export function createLogger(category: string) {
    const log = (level: LogLevel, message: string, data?: Record<string, unknown>) => {
        const entry = createLogEntry(level, category, message, data);
        addToBuffer(entry);
        logToConsole(entry);
    };

    return {
        debug: (message: string, data?: Record<string, unknown>) => log('debug', message, data),
        info: (message: string, data?: Record<string, unknown>) => log('info', message, data),
        warn: (message: string, data?: Record<string, unknown>) => log('warn', message, data),
        error: (message: string, data?: Record<string, unknown>) => log('error', message, data),
    };
}

// Pre-configured loggers for different parts of the app
export const surveyLogger = createLogger('Survey');
export const navigationLogger = createLogger('Navigation');
export const formLogger = createLogger('Form');
export const analyticsLogger = createLogger('Analytics');

/**
 * Get the current log buffer (for debugging)
 */
export function getLogBuffer(): ReadonlyArray<LogEntry> {
    return [...logBuffer];
}

/**
 * Clear the log buffer
 */
export function clearLogBuffer() {
    logBuffer.length = 0;
}

/**
 * Export logs as JSON for analysis
 */
export function exportLogs(): string {
    return JSON.stringify(logBuffer, null, 2);
}
