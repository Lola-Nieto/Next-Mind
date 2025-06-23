export class ToolUseTracker  {
    constructor() {
        this.usoPorTool = {};
    }

    reset() {
        this.usoPorTool = {};
    }

    registrar(toolName) {
        if (!this.usoPorTool[toolName]) {
            this.usoPorTool[toolName] = 0;
        }
        this.usoPorTool[toolName]++;
    }

    fueUsado(toolName) {
        return !!this.usoPorTool[toolName];
    }

    vecesUsado(toolName) {
        return this.usoPorTool[toolName] || 0;
    }
}

