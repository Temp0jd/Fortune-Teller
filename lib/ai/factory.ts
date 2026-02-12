import { AIProvider, AIConfig } from './types';
import { KimiProvider } from './providers/kimi';
import { GLMProvider } from './providers/glm';
import { AnthropicProvider } from './providers/anthropic';
import { DeepSeekProvider } from './providers/deepseek';

export function createAIProvider(config?: AIConfig): AIProvider {
  // Use environment variables if config not provided
  const provider = config?.provider || process.env.AI_PROVIDER || 'anthropic';

  let apiKey: string;
  let baseUrl: string | undefined;

  // Get configuration based on provider
  switch (provider.toLowerCase()) {
    case 'anthropic':
      apiKey = config?.apiKey || process.env.ANTHROPIC_AUTH_TOKEN || process.env.AI_API_KEY || '';
      baseUrl = config?.baseUrl || process.env.ANTHROPIC_BASE_URL || process.env.AI_BASE_URL;
      break;
    case 'kimi':
      apiKey = config?.apiKey || process.env.KIMI_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN || process.env.AI_API_KEY || '';
      baseUrl = config?.baseUrl || process.env.KIMI_BASE_URL || process.env.ANTHROPIC_BASE_URL || process.env.AI_BASE_URL;
      break;
    case 'glm':
      apiKey = config?.apiKey || process.env.GLM_API_KEY || process.env.AI_API_KEY || '';
      baseUrl = config?.baseUrl || process.env.GLM_BASE_URL || process.env.AI_BASE_URL;
      break;
    case 'deepseek':
      apiKey = config?.apiKey || process.env.DEEPSEEK_API_KEY || process.env.AI_API_KEY || '';
      baseUrl = config?.baseUrl || process.env.DEEPSEEK_BASE_URL || process.env.AI_BASE_URL;
      break;
    default:
      apiKey = config?.apiKey || process.env.AI_API_KEY || '';
      baseUrl = config?.baseUrl || process.env.AI_BASE_URL;
  }

  if (!apiKey) {
    throw new Error(`AI API key is required for ${provider}. Set ${provider.toUpperCase()}_API_KEY or AI_API_KEY environment variable.`);
  }

  switch (provider.toLowerCase()) {
    case 'anthropic':
      return new AnthropicProvider(apiKey, baseUrl);
    case 'kimi':
      return new KimiProvider(apiKey, baseUrl);
    case 'glm':
      return new GLMProvider(apiKey, baseUrl);
    case 'deepseek':
      return new DeepSeekProvider(apiKey, baseUrl);
    default:
      throw new Error(`Unknown AI provider: ${provider}. Supported: anthropic, kimi, glm, deepseek`);
  }
}

// Singleton instance for server-side usage
let globalProvider: AIProvider | null = null;

export function getGlobalAIProvider(): AIProvider {
  if (!globalProvider) {
    globalProvider = createAIProvider();
  }
  return globalProvider;
}

export function resetGlobalAIProvider(): void {
  globalProvider = null;
}
