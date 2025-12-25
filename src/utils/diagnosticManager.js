/**
 * Comprehensive System Diagnostics and Error Handling Utilities
 * Provides intelligent problem diagnosis, stack trace analysis, and network diagnostics
 */

class DiagnosticManager {
  constructor() {
    this.logs = [];
    this.errorCounts = new Map();
    this.performanceMetrics = new Map();
    this.startTime = Date.now();
  }

  /**
   * Enhanced error logging with categorization and stack trace analysis
   */
  logError(error, context = {}) {
    const errorInfo = {
      timestamp: new Date().toISOString(),
      message: error.message || "Unknown error",
      stack: error.stack || "No stack trace available",
      type: this.categorizeError(error),
      context: context,
      url: window.location.href,
      userAgent: navigator.userAgent,
      memoryUsage: this.getMemoryUsage(),
      performanceEntries: this.getPerformanceEntries(),
    };

    this.logs.push(errorInfo);
    this.incrementErrorCount(errorInfo.type);

    // Log to console with enhanced formatting
    console.group(`🚨 Error [${errorInfo.type}]`);
    console.error("Message:", errorInfo.message);
    console.error("Stack:", errorInfo.stack);
    console.error("Context:", context);
    console.error("Memory Usage:", errorInfo.memoryUsage);
    console.groupEnd();

    return errorInfo;
  }

  /**
   * Categorize errors for better debugging
   */
  categorizeError(error) {
    const message = error.message?.toLowerCase() || "";

    if (
      message.includes("network") ||
      message.includes("fetch") ||
      message.includes("cors")
    ) {
      return "NETWORK_ERROR";
    }
    if (message.includes("syntax") || message.includes("parse")) {
      return "SYNTAX_ERROR";
    }
    if (message.includes("timeout")) {
      return "TIMEOUT_ERROR";
    }
    if (message.includes("permission") || message.includes("access")) {
      return "PERMISSION_ERROR";
    }
    if (message.includes("memory") || message.includes("heap")) {
      return "MEMORY_ERROR";
    }

    return "UNKNOWN_ERROR";
  }

  /**
   * Network connectivity diagnostics
   */
  async diagnoseNetworkConnectivity() {
    const diagnostics = {
      timestamp: new Date().toISOString(),
      onlineStatus: navigator.onLine,
      connectionType: this.getConnectionType(),
      testEndpoints: [],
    };

    // Test multiple endpoints
    const endpoints = [
      {
        name: "Quotable API",
        url: "https://dummyjson.com/quotes/random",
        critical: true,
      },
      { name: "Google DNS", url: "https://8.8.8.8", critical: false },
      { name: "GitHub", url: "https://api.github.com", critical: false },
    ];

    for (const endpoint of endpoints) {
      const result = await this.testEndpoint(endpoint.url, endpoint.critical);
      diagnostics.testEndpoints.push({
        name: endpoint.name,
        url: endpoint.url,
        critical: endpoint.critical,
        ...result,
      });
    }

    return diagnostics;
  }

  /**
   * Test individual endpoint
   */
  async testEndpoint(url, isCritical = false) {
    const startTime = performance.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        isCritical ? 10000 : 5000
      );

      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      return {
        status: "success",
        httpStatus: response.status,
        responseTime: Math.round(responseTime),
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (error) {
      const endTime = performance.now();
      const responseTime = endTime - startTime;

      return {
        status: "failed",
        httpStatus: 0,
        responseTime: Math.round(responseTime),
        error: error.name,
        errorMessage: error.message,
      };
    }
  }

  /**
   * Get memory usage information
   */
  getMemoryUsage() {
    if (performance.memory) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576) + " MB",
        total: Math.round(performance.memory.totalJSHeapSize / 1048576) + " MB",
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576) + " MB",
      };
    }
    return "Memory API not supported";
  }

  /**
   * Get performance entries
   */
  getPerformanceEntries() {
    const entries = performance.getEntriesByType("navigation");
    if (entries.length > 0) {
      const nav = entries[0];
      return {
        domContentLoaded: Math.round(
          nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart
        ),
        loadComplete: Math.round(nav.loadEventEnd - nav.loadEventStart),
        firstPaint: this.getFirstPaint(),
        firstContentfulPaint: this.getFirstContentfulPaint(),
      };
    }
    return null;
  }

  /**
   * Get first paint timing
   */
  getFirstPaint() {
    const paintEntries = performance.getEntriesByType("paint");
    const firstPaint = paintEntries.find(
      (entry) => entry.name === "first-paint"
    );
    return firstPaint ? Math.round(firstPaint.startTime) : null;
  }

  /**
   * Get first contentful paint timing
   */
  getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType("paint");
    const fcp = paintEntries.find(
      (entry) => entry.name === "first-contentful-paint"
    );
    return fcp ? Math.round(fcp.startTime) : null;
  }

  /**
   * Get connection type (if available)
   */
  getConnectionType() {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    if (connection) {
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink + " Mbps",
        rtt: connection.rtt + " ms",
      };
    }
    return "Connection API not supported";
  }

  /**
   * Increment error count for categorization
   */
  incrementErrorCount(errorType) {
    const current = this.errorCounts.get(errorType) || 0;
    this.errorCounts.set(errorType, current + 1);
  }

  /**
   * Get system health score
   */
  getSystemHealthScore() {
    const totalErrors = Array.from(this.errorCounts.values()).reduce(
      (sum, count) => sum + count,
      0
    );
    const uptime = Date.now() - this.startTime;

    // Base score
    let score = 100;

    // Deduct points for errors
    score -= Math.min(totalErrors * 10, 50);

    // Deduct points for critical network failures
    const criticalErrors = this.errorCounts.get("NETWORK_ERROR") || 0;
    score -= Math.min(criticalErrors * 20, 40);

    // Add points for uptime
    if (uptime > 300000) {
      // 5 minutes
      score += 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Generate comprehensive diagnostic report
   */
  generateDiagnosticReport() {
    const report = {
      timestamp: new Date().toISOString(),
      systemHealth: this.getSystemHealthScore(),
      uptime: Date.now() - this.startTime,
      errorSummary: Object.fromEntries(this.errorCounts),
      totalErrors: this.logs.length,
      recentErrors: this.logs.slice(-5),
      performance: this.getPerformanceEntries(),
      memory: this.getMemoryUsage(),
      connection: this.getConnectionType(),
    };

    return report;
  }
}

// Create global diagnostic manager instance
const diagnosticManagerInstance = new DiagnosticManager();

export { DiagnosticManager };
export { diagnosticManagerInstance as diagnosticManager };
