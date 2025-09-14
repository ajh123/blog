import { type AstroIntegration } from "astro";
import { type PostHogConfig } from "posthog-js";
import { PostHog, type PostHogOptions } from 'posthog-node'

type ClientConfig = Partial<PostHogConfig>
type ServerConfig = Partial<PostHogOptions>

let posthogInstance: PostHog | null = null
let globalConfig: ClientConfig | null = null
let globalPosthogKey: string | null = null

const createPlugin = (posthogKey: string, config: ClientConfig): AstroIntegration => {
    globalConfig = config;
    globalPosthogKey = posthogKey;
	return {
		name: "astro-posthog",
		hooks: {
			"astro:config:setup": async ({ injectScript }) => {
				injectScript(
					"page",
					`import posthog from 'posthog-js';posthog.init('${
						globalPosthogKey
					}', ${JSON.stringify(config)});`
				);
			},
		},
	};
};

export function getPostHogDistinctId() {
    const ph_project_api_key = 'phc_n17zLe4q3Ejrry0lUNzOti6FzeDBVuevjuL91eoxpSa'
    const ph_cookie_key = `ph_${ph_project_api_key}_posthog`
    window.document.cookie.split('; ').forEach(cookie => {
        const [name, value] = cookie.split('=');
        if (name === ph_cookie_key) {
            const parsed = JSON.parse(decodeURIComponent(value));
            return parsed.distinct_id;
        }
    });
    return crypto.randomUUID();;
}


export function getPostHogServer(posthogKey: string, serverConfig: ServerConfig) {
    if (!posthogInstance) {
        posthogInstance = new PostHog(
            posthogKey,
            serverConfig
        )
    }
    return posthogInstance
}

export default createPlugin;